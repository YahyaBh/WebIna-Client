import React, { Profiler, useEffect, useState } from 'react'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import Loading from '../Loading/Loading'
import AsideStore from '../Layout/Aside/AsideStore';
import { MdKeyboardArrowRight , MdKeyboardArrowLeft} from 'react-icons/md';
import './Store.scss'
import { BsFillStarFill, BsStar, BsStarHalf, BsCart2 } from 'react-icons/bs';
import TestImage from '../../../../Assets/Home/Projects Section/TestProjects.png'



// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const Store = () => {

    const [animationLoading, setAnimationLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([
        { id: 1, title: 'Product 1', category: 'Category 1', price: 23.00, purchase: 23, rating: 5 },
        { id: 2, title: 'Product 2', category: 'Category 4', price: 70.00, purchase: 321, rating: 4.5 },
        { id: 3, title: 'Product 3', category: 'Category 43', price: 35.00, purchase: 2324, rating: 2.3 },
        { id: 4, title: 'Product 4', category: 'Category 654', price: 50.00, purchase: 765, rating: 5 },
        { id: 5, title: 'Product 5', category: 'Category 34', price: 50.00, purchase: 765, rating: 5 },
        { id: 6, title: 'Product 6', category: 'Category 4', price: 50.00, purchase: 765, rating: 5 },
        { id: 7, title: 'Product 7', category: 'Category 65434', price: 50.00, purchase: 765, rating: 5 }
    ]);
    const [filter, setFilter] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);

    useEffect(() => {
        setFilter('All');

        setTimeout(() => {
            setLoading(false);
            setAnimationLoading('fade-in')

            setTimeout(() => {
                setAnimationLoading('')
            }, 2000);
        }, 2000);
    }, []);

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
        <Profiler id='store-prof'>

            {loading ? <Loading /> : ''}

            <NavbarStore />


            <div id='store'>

                <AsideStore />

                <div className="left-container">
                    <nav className='top-chart'>
                        <Swiper
                            navigation={{
                                prevEl: '#prev-button',
                                nextEl: '#next-button',
                            }}
                            draggable={true}
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
                                    <div key={product.id} className='card'>
                                        <img src={TestImage} alt="product" />

                                        <div className='under-container'>
                                            <div className="left-cont">
                                                <h3>{product.title}</h3>
                                                <p><BsCart2 /> {product.purchase} purchase</p>
                                                <div className='stars'>

                                                    {renderStars(product.rating)}
                                                </div>
                                            </div>

                                            <div className="right-cont">
                                                <h2>{product.price}$</h2>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>}
                    </div>
                </div>


            </div>

        </Profiler >
    )
}

export default Store