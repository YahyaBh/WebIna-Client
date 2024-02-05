import React, { Profiler, useEffect, useState } from 'react'

import './Product.scss'
import AuthUser from '../../Context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import AsideStore from '../Layout/Aside/AsideStore'
import { useStoreContext } from '../../Context/StoreConetxt'
import { BiCart, BiDownload, BiLeftArrow, BiLinkAlt } from 'react-icons/bi'
import { BsCart2, BsEye, BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs'

import { TbProgressCheck } from "react-icons/tb";
import { IoMdPricetag } from "react-icons/io";
import { FaExternalLinkAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

import ADS from '../../Assets/Home/Projects Section/TestProjects.png'
import Footer from '../Layout/Footer/Footer'
import Swal from 'sweetalert2'
import ImageLoader from '../Layout/ImageLoader/ImageLoader'
import moment from 'moment'


const Product = () => {

    const [loadingPDF, setLoadingPDF] = useState(false)

    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true);
    const [addToCart, setAddToCart] = useState(false);
    const [loadingAdding, setLoadingAdding] = useState(false);
    const [inCart, setInCart] = useState(false);

    const [feedbacks, setFeedbacks] = useState([]);


    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0);
    const [lodaingAddingFeedback, setLoadingAddingFeedback] = useState(false)
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleStarHover = (hoveredRating) => {
        setHoveredRating(hoveredRating);
    };

    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    const stars = Array.from({ length: 5 }, (_, index) => index + 1);



    const { sec_http, file_download, setCartCounter } = AuthUser();
    const { isAsideOpen } = useStoreContext();

    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (token) {
            getProductsData();
            handleGetCart();
            handleGetFeedbacks();
            setLoading(false);

        } else {
            navigate('/store/home')
        }

    }, [])



    const getProductsData = async () => {
        await sec_http.post('/api/store/product', { product_token: token })
            .then((res) => {
                setProduct(res.data.product);
                setLoading(false);
            })
            .catch((err) => {
                navigate('/store')
            })

    }


    const handleGetFeedbacks = async () => {
        await sec_http.post('/api/store/product/feedbacks', { product_token: token })
            .then((res) => {
                setFeedbacks(res.data.feedbacks);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const renderStars = (e) => {
        const maxRating = 5;
        const stars = [];

        for (let i = 0; i < maxRating; i++) {
            let starIcon;

            if (i < Math.floor(e)) {
                starIcon = <BsFillStarFill />;
            } else if (i === Math.floor(e) && !Number.isInteger(e)) {
                starIcon = <BsStarHalf />;
            } else {
                starIcon = <BsStar />;
            }

            stars.push(
                <div
                    key={i}
                    className={`star`}
                >
                    {starIcon}
                </div>
            );
        }

        return stars;
    };


    const handleAddToCart = async () => {
        if (!inCart) {
            await sec_http.post('/api/cart/add/product', { product_token: token })
                .then((res) => {
                    setAddToCart(!addToCart);
                    setInCart(!inCart);
                    setCartCounter(res.data.cart_count);
                    Swal.fire({
                        toast: true,
                        icon: 'success',
                        title: 'Product Added To Cart',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            setLoadingAdding(false);
        } else {
            await sec_http.post('/api/cart/remove/product', { product_token: token })
                .then((res) => {
                    setInCart(!inCart);
                    setCartCounter(res.data.cart_count);
                    Swal.fire({
                        toast: true,
                        icon: 'success',
                        title: 'Product Removed From Cart',
                        position: 'bottom-right',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            setLoadingAdding(false);
        }
    }

    const handeAddFeedback = async () => {

        if (rating > 0 && title && text) {
            setLoadingAddingFeedback(true);
            await sec_http.post('/api/store/feedback/add', { title: title, text: text, product_token: token, rating: rating })
                .then((res) => {
                    setRating(0);
                    handleGetFeedbacks();
                    setLoadingAddingFeedback(false);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    const handleGetCart = async () => {
        await sec_http.post('/api/cart/product', { product_token: token })

            .then((res) => {
                if (res.data.available === true) {
                    setInCart(true)
                } else {
                    setInCart(false)
                }

            })
            .catch((err) => {
                console.log(err)
            })
    }


    const downloadHandler = () => {
        setLoadingPDF(true)
        file_download.get(`/api/store/product/download/${token}`, { responseType: 'blob' })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        loading ? <Loading /> :
            <>
                <Helmet>
                    <title>{`WEBINA DIGITAL | ${product.name}`}</title>
                    <meta name="description" content={product.description} />
                </Helmet>

                <Profiler id='store-prof'>


                    <NavbarStore />

                    <div className={"modal-add-to-cart" + (addToCart ? ' active-modal' : '')}>

                        <div className="container">
                            <div className="head">
                                <h2><span>{product.name}</span> added to cart !</h2>
                            </div>

                            <div className="body">
                                you want to check out right now ?

                                <div className="buttons">
                                    <button onClick={() => navigate('/cart')}>
                                        Check Out
                                    </button>

                                    <button onClick={() => setAddToCart(!addToCart)}>
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div id='product' className={isAsideOpen ? 'aside-open' : ''}>

                        <AsideStore />


                        <div className="container">




                            <div className="back-button" onClick={() => navigate(-1)}>
                                <BiLeftArrow /> Back
                            </div>

                            <div className="head_container">


                                <div className="left-container">
                                    {product?.image1 && product?.image2 ? (
                                        <div className="image-container">

                                            <ImageLoader imageUrls={[product?.image1]} />
                                            {/* <img src={product?.image1} alt={product?.name} onLoad={() => this.setState({loaded: true})} /> */}

                                            <div className="bottom-image">
                                                {[product?.image2, product?.image3, product?.image4, product?.image5, product?.image6, product?.image7].filter(Boolean).map((image, index) => (
                                                    image ? <img key={index} src={image} alt="" /> : ''
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="image-container-skeleton">
                                            <div className="image-skel-main"></div>

                                            <div className="bottom-image-skeleton">
                                                {[...Array(7)].map((_, index) => (
                                                    <div key={index} className="image-skel"></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="right-container">
                                    <div className="head-text">
                                        <h2>{product?.name}</h2>
                                        <p>{product?.description}</p>
                                        <h3><IoMdPricetag /> PRICE : <span>{product?.price}$</span> {product.old_price ? <sub>{product?.old_price}$</sub> : ''}</h3>
                                    </div>

                                    <div className="details-products">
                                        <div className="cont">
                                            <BiCart />
                                            <h3><span>{product?.purchases}</span> Purchases</h3>
                                        </div>
                                        <div className="cont" >
                                            <BiDownload />
                                            <h3><span>{product?.downloads}</span> Downloads</h3>
                                        </div>
                                        <div className="cont">
                                            <BsEye />
                                            <h3><span>{product?.views}</span> Views</h3>
                                        </div>
                                    </div>


                                    <div className="infos-container">
                                        <div className="cont">
                                            <h3><TbProgressCheck /> Last Update :</h3>
                                            <span>{product?.last_updated?.split('T')[0]}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Published :</h3>
                                            <span>{product?.created_at?.split('T')[0]}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Status :</h3>
                                            <span>{product?.status}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Tags :</h3>
                                            <div className='tags-container'>{product?.tags?.replace(/ /g, '').split(',')?.map((tag) => <span><a href={`/store/${tag}`} key={tag}>{tag} </a><FaExternalLinkAlt /></span>)}</div>
                                        </div>

                                    </div>


                                    <div className="share-container">
                                        <h3>Share this item :</h3><div className="social"><FaFacebook /> <FaInstagram /> <FaWhatsapp /> <span><BiLinkAlt /> Copy Link</span></div>
                                    </div>


                                    <div className="buttons-container">
                                        <button onClick={handleAddToCart}>{inCart ? 'Remove From Cart' : loadingAdding ? 'Adding...' : 'Add to Cart'}</button>


                                        <div className="bottom-buttons">
                                            <a href={product?.link} target="_blank" rel="noreferrer noopener" className={product?.link ? '' : 'disabled'}  >LIVE PREVIEW</a>
                                            <button onClick={() => downloadHandler()} className={product?.pdf ? '' : 'disabled'}>{loadingPDF ? 'Getting Info...' : 'Download PDF'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="reviews_container">

                                <div className="title">
                                    <h2>Reviews</h2>
                                </div>


                                <div className="container-split">
                                    <div className="feedback-container">

                                        <h2>Customers Feedback</h2>

                                        <div className="cards-container">

                                            {feedbacks?.filter((feedback) => feedback?.status === 'active').map((feedback) =>
                                                <div className="card" key={feedback?.id}>

                                                    <img src={feedback.user.avatar} alt="customer-img" />

                                                    <div className="body">
                                                        <h3>{feedback.user.name} <span>{moment(feedback.created_at).fromNow()}</span></h3>
                                                        <div className="stars-container">
                                                            {renderStars(feedback.rating)}
                                                        </div>
                                                        <h4>{feedback.title}</h4>
                                                        <p>{feedback.text}</p>
                                                    </div>

                                                </div>)
                                            }

                                        </div>

                                        <h2>Write a Review</h2>

                                        <div className="review-container">
                                            <h5>What is it like to this product ?</h5>

                                            <div className="stars-container">
                                                {stars.map((star) => (
                                                    <BsFillStarFill
                                                        key={star}
                                                        onClick={() => handleStarClick(star)}
                                                        onMouseEnter={() => handleStarHover(star)}
                                                        onMouseLeave={handleMouseLeave}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: star <= (hoveredRating || rating) ? '#ffe662' : 'gray',
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            <label htmlFor="review_title">Review Title
                                                <input type="text" name='review_title' placeholder='Enter your review title' onChange={(e) => setTitle(e.target.value)} value={title} />
                                            </label>

                                            <label htmlFor="review_content">Review Content
                                                <textarea name='review_content' placeholder='Enter your review content' onChange={(e) => setText(e.target.value)} value={text} />
                                            </label>

                                            <button onClick={() => handeAddFeedback()}>{lodaingAddingFeedback ? 'Sending...' : 'Send Your Review'}</button>
                                        </div>

                                    </div>



                                    <div className="advertisement-container">

                                    </div>

                                </div>

                                <hr style={{ width: '80%' }} />


                                <div className="related-products">
                                    <h2>Related Products</h2>


                                    <div className="cards-container">

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='card'>
                                            <img src={ADS} alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>Test new</h3>
                                                    <p><BsCart2 /> 2000 purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(4.5)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>150$</h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div style={{ marginTop: '100px' }}>
                        <Footer />
                    </div>
                </Profiler >
            </>
    )
}




export default Product





