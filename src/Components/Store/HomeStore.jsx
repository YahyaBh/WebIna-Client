import React, { useEffect, useState, Profiler } from 'react'
import { Helmet } from 'react-helmet-async'
import Loading from '../Loading/Loading'
import Navbar from '../Layout/Navbar/Navbar'
import './HomeStore.scss'

import { useNavigate } from 'react-router-dom'

import AuthContext from '../../Context/AuthContext';
import { BsCart2, BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs'

import ADS from '../../Assets/Home/Projects Section/TestProjects.png'
import i18next from 'i18next'
import { BiArrowFromLeft } from 'react-icons/bi'
import Footer from '../Layout/Footer/Footer'

const HomeStore = () => {


    const [animationLoading, setAnimationLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [new_products, setNewProducts] = useState([]);
    const [top_products, setTopProducts] = useState([]);
    const [ads, setAds] = useState([]);

    const [filter, setFilter] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loadingItems, setLoadingItems] = useState(true);

    const { sec_http, isAuthenticated } = AuthContext();
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) {
            setFilter('All');

            getProducts();
        } else {
            navigate('/', { replace: true });
        }
    }, []);

    const getProducts = async () => {

        sec_http.post('/api/store')
            .then(res => {
                setProducts(res.data.products);
                setCategories(res.data.categories);
                setNewProducts(res.data.new_products);
                setAds(res.data.ads);
                setTopProducts(res.data.top_products);


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
                <title>WEBINA DIGITAL | Store Home</title>
                <meta name="description" content="Choose your ideal Website , Mobile app , UI/UX design , Desktop Application , with the best price" />
                <link rel='canonical' content="/store/home" />
            </Helmet>

            <Profiler id='home-store-prof'>

                {loading ? <Loading /> : ''}

                <Navbar />


                <div id='home_store'>

                    <div className="store_header">


                        <h2 className='main_text'>BUY AND DIGITALIZE</h2>

                        <p>Lorem Ips incorrectly dedentifies that the application is free <br /> to copy, modify, and distribute copies of the Software</p>

                        <a href='/store' className='get_started'>GET STARTED</a>
                        <a href='/custom/product' className='custom_product'>CUSTOM PRODUCT</a>


                    </div>



                    <div className="store_categoires">


                        <div className="upper_container">
                            <h2 className='main_text'>PRODUCTS CATEGORIES</h2>
                            <p>Choose specifically what you are looking for</p>
                        </div>


                        <div className="bottom_container">

                            <div className="card">

                            </div>

                            <div className="card">

                            </div>

                            <div className="card">

                            </div>

                            <div className="card">

                            </div>


                        </div>



                    </div>


                    <div className="store_new">

                        <div className="upper_container">
                            <h2 className='main_text'>NEW PRODUCTS</h2>
                            <p>Check out latest products added to our shop</p>
                        </div>


                        <div className="bottom_container">

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


                    <div className="store_ad">
                        <img src={ADS} alt="ad" />
                    </div>

                    <div className="store_top_selled">

                        <div className="upper_container">
                            <h2 className='main_text'>TOP SELLED PRODUCTS</h2>
                            <p>Find the most popular & selled products</p>
                        </div>


                        <div className="bottom_container">

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



                    <section className="contact-section">
                        <h2>{i18next.t('WE_ARE_HERE_FOR_YOU')}</h2>


                        <div className='container'>
                            <div>
                                <h3>{i18next.t('GET_ANSWERS')}</h3>
                                <p>{i18next.t('GET_ANSWERS_PAG')}</p>

                                <a href="/maintanence">{i18next.t('GO_TO_HELP_CENTER')} <BiArrowFromLeft /></a>
                            </div>

                            <div>
                                <h3>{i18next.t('CONTACT_US')}</h3>
                                <p>{i18next.t('CONTACT_US_PAG')}</p>

                                <a href="/maintanence">{i18next.t('CHAT_WITH_US')} <BiArrowFromLeft /></a>
                            </div>

                            <div>
                                <h3>{i18next.t('HIRE_A_PRO')}</h3>
                                <p>{i18next.t('HIRE_A_PRO_PAG')}</p>

                                <a href="/maintanence">{i18next.t('BROWSE_ALL_SERVICES')} <BiArrowFromLeft /></a>
                            </div>

                        </div>
                    </section>

                    <Footer />

                </div>
            </Profiler>
        </>
    )
}

export default HomeStore