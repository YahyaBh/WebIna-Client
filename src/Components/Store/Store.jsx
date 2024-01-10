import React, { Profiler, useEffect, useState } from 'react'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import Loading from '../Loading/Loading'
import AsideStore from '../Layout/Aside/AsideStore';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import './Store.scss'
import { BsFillStarFill, BsStar, BsStarHalf, BsCart2 } from 'react-icons/bs';
import TestImage from '../../Assets/Home/Projects Section/TestProjects.png'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.scss';

// import required modules
import { Navigation } from 'swiper/modules';


import AuthContext from '../../Context/AuthContext';
import { useStoreContext } from '../../Context/StoreConetxt';

const Store = () => {

    const [animationLoading, setAnimationLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);

    const { sec_http, isAuthenticated, csrf } = AuthContext();
    const { isAsideOpen } = useStoreContext();



    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) {
            csrf();
            setFilter('All');
            getProducts();
        } else {
            navigate('/login', { replace: true });
        }
    }, []);

    const getProducts = async () => {

        sec_http.post('/api/store')
            .then(res => {
                setProducts(res.data.products)
                setLoading(false);
                setAnimationLoading('fade-in')

                setTimeout(() => {
                    setAnimationLoading('')
                }, 2000);
            })

    }

    useEffect(() => {
        setAnimationLoading('fade-out');
        const uniqueCategories = Array.from(new Set(products.map(product => product.category)));
        setCategories(uniqueCategories);
    }, [products]);

    useEffect(() => {
        setAnimationLoading('fade-out');

        if (filter === 'All') {
            setFilteredProducts(products);
            setLoadingItems(false)
        } else {
            const filtered = products.filter(product => product.category === filter);
            setFilteredProducts(filtered);
            setLoadingItems(false)
        }
    }, [filter, products]);

    const handleFiltering = (e) => {
        console.log(e);

        if (e === 'All' && filter !== e) {
            setFilter('All')
        }
        else if (filter !== e || e !== 'All') {

            setLoadingItems(true)

            setTimeout(() => {
                setFilter(e);
                setLoadingItems(false)
            }, 1500);

        }
    };

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


    return (

        <>
            <Helmet>
                <title>WEBINA DIGITAL | Store</title>
                <meta name="description" content="Choose your ideal Website , Mobile app , UI/UX design , Desktop Application , with the best price" />
                <link rel='canonical' content="/store" />
            </Helmet>

            <Profiler id='store-prof'>

                {loading ? <Loading /> : ''}

                <NavbarStore />


                <div id='store' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />

                    <div className="left-container">
                        <nav className='top-chart'>
                            <Swiper
                                navigation={{
                                    prevEl: '#prev-button',
                                    nextEl: '#next-button',
                                }}
                                slidesPerView={6}
                                spaceBetween={0}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                <SwiperSlide><li onClick={e => handleFiltering('All')}>All</li></SwiperSlide>

                                {categories.map((category, index) => (
                                    <SwiperSlide><li key={index} onClick={e => handleFiltering(category)}>{category}</li></SwiperSlide>
                                ))}

                                <MdKeyboardArrowLeft id='#prev-button' />
                                <MdKeyboardArrowRight id='#next-button' />

                            </Swiper>


                        </nav>


                        <div className="container">
                            {loadingItems ?

                                <>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-loading">
                                        <div className='loading-img'></div>

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <div className='title'></div>
                                                <div className='paragraph'></div>
                                                <div className='stars'></div>
                                            </div>

                                            <div className="right-cont">
                                                <div className='price'></div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                :
                                <>


                                    {filteredProducts.map(product => (
                                        <a href={`/store/product/${product?.token ?? product.token}`} key={product.id} className='card' title={product.description}>
                                            <img src={product.image1} className={product?.image1 ? product.image1 : 'loading-skeleton' } alt="product" />

                                            <div className='under-container'>
                                                <div className="left-cont">
                                                    <h3>{product.name.lenght > 10 ? product.name.substring(0, 10) + '...' : product.name}</h3>
                                                    <p><BsCart2 /> {product.purchases} purchase</p>
                                                    <div className='stars'>

                                                        {renderStars(product.rating)}
                                                    </div>
                                                </div>

                                                <div className="right-cont">
                                                    <h2>{product.price}$</h2>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </>}
                        </div>
                    </div>


                </div>

            </Profiler >
        </>
    )
}

export default Store