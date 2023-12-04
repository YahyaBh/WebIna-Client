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


const Product = () => {


    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true);
    const [addToCart, setAddToCart] = useState(false);
    const [loadingAdding, setLoadingAdding] = useState(false);


    const { sec_http } = AuthUser();
    const { isAsideOpen } = useStoreContext();

    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        if (token) {
            getProductsData();
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


    const handleAddToCart = () => {

        setLoadingAdding(true);
        sec_http.post('/api/cart/add/product', { product_token: token })
            .then((res) => {
                console.log(res)
                setAddToCart(!addToCart);
                setLoadingAdding(false);
            })
            .catch((err) => {
                setLoadingAdding(false);
                console.log(err)
            })


    }

    return (
        loading ? <Loading /> :
            <>
                <Helmet>
                    <title>WEBINA DIGITAL | {product.name}</title>
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
                                    {product.image1 && product.image2 ? (
                                        <div className="image-container">
                                            <img src={product.image1} alt={product.name} />

                                            <div className="bottom-image">
                                                {[product.image2, product.image3, product.image4, product.image5, product.image6, product.image7].filter(Boolean).map((image, index) => (
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
                                        <h2>{product.name}</h2>
                                        <p>{product.description}</p>
                                        <h3><IoMdPricetag /> PRICE : <span>{product.price}$</span> <sub>{product.old_price}$</sub></h3>
                                    </div>

                                    <div className="details-products">
                                        <div className="cont">
                                            <BiCart />
                                            <h3><span>{product.purchases}</span> Purchases</h3>
                                        </div>
                                        <div className="cont">
                                            <BiDownload />
                                            <h3><span>{product.downloads}</span> Downloads</h3>
                                        </div>
                                        <div className="cont">
                                            <BsEye />
                                            <h3><span>{product.views}</span> Views</h3>
                                        </div>
                                    </div>


                                    <div className="infos-container">
                                        <div className="cont">
                                            <h3><TbProgressCheck /> Last Update :</h3>
                                            <span>{product.last_updated.split('T')[0]}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Published :</h3>
                                            <span>{product.created_at.split('T')[0]}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Status :</h3>
                                            <span>{product.status}</span>
                                        </div>

                                        <div className="cont">
                                            <h3><TbProgressCheck /> Tags :</h3>
                                            <a href={`/store/${product.tags}`}>{product.tags} <FaExternalLinkAlt /></a>
                                        </div>

                                    </div>


                                    <div className="share-container">
                                        <h3>Share this item :</h3><div className="social"><FaFacebook /> <FaInstagram /> <FaWhatsapp /> <span><BiLinkAlt /> Copy Link</span></div>
                                    </div>


                                    <div className="buttons-container">
                                        <button onClick={handleAddToCart}>{loadingAdding ? 'Adding...' : 'Add to Cart'}</button>

                                        <div className="bottom-buttons">
                                            <button>LIVE PREVIEW</button>
                                            <button>DOWNLOAD PDF</button>
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

                                            <div className="card">

                                                <img src={'https://placehold.co/600x400'} alt="customer-img" />

                                                <div className="body">
                                                    <h3>Nicolas Burdano <span>3 days ago</span></h3>
                                                    <div className="stars-container">
                                                        <BsFillStarFill />
                                                        <BsFillStarFill />
                                                        <BsFillStarFill />
                                                        <BsFillStarFill />
                                                        <BsFillStarFill />
                                                    </div>
                                                    <h4>Great Product</h4>
                                                    <p>There are many variations of passages of Lorem Ipsum available, but the
                                                        majority have suffered alteration in some form, by injected humour</p>
                                                </div>

                                            </div>

                                        </div>

                                        <h2>Write a Review</h2>

                                        <div className="review-container">
                                            <h5>What is it like to this product ?</h5>

                                            <div className="stars-container">
                                                <BsFillStarFill />
                                                <BsFillStarFill />
                                                <BsFillStarFill />
                                                <BsFillStarFill />
                                                <BsFillStarFill />
                                            </div>

                                            <label htmlFor="review_title">Review Title
                                                <input type="text" name='review_title' placeholder='Enter your review title' />
                                            </label>

                                            <label htmlFor="review_content">Review Content
                                                <textarea name='review_content' placeholder='Enter your review content' />
                                            </label>

                                            <button>Send my review</button>
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





