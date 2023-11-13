import React, { useState, Profiler, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Loading from '../Loading/Loading'
import Navbar from '../Layout/Navbar/Navbar'
import './HomeStore.scss'

import DevIcon from '../../Assets/Home/Section 2/dev-icon.svg'
import SocialIcon from '../../Assets/Home/Section 2/social-icon.svg';
import DesignIcon from '../../Assets/Home/Section 2/design-icon.svg';
import MobileIcon from '../../Assets/Home/Section 2/mobile-icon.svg';
import DesktopIcon from '../../Assets/Home/Section 2/desktop-icon.svg';

import { BsCart2, BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs'

import ADS from '../../Assets/Home/Projects Section/TestProjects.png'
import i18next from 'i18next'
import { BiArrowFromLeft } from 'react-icons/bi'
import Footer from '../Layout/Footer/Footer'

import VideoHomeStore from '../../Assets/Store/Home/Blurred Video of Scripts Being Typed.mp4';
import { ThemeContext } from '../../Context/ThemeContext'
import Aos from 'aos'

const HomeStore = () => {


    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [new_products, setNewProducts] = useState([]);
    const [top_products, setTopProducts] = useState([]);
    const [ads, setAds] = useState([]);



    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        Aos.init();
    }, [])

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

                        <div id="outer">
                            <div id="home-top-video">
                                <video autoPlay={true} loop={true} muted>
                                    <source src={VideoHomeStore} type="video/mp4" />
                                </video>
                                <div id="home-text">
                                    <h2 className='main_text'>BUY AND DIGITALIZE</h2>

                                    <p>Lorem Ips incorrectly dedentifies that the application is free <br /> to copy, modify, and distribute copies of the Software</p>

                                    <a href='/store' className='get_started'>GET STARTED</a>
                                    <a href='/custom/product' className='custom_product'>CUSTOM PRODUCT</a>

                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="categories-container" >
                        <div className="cards-text-container" >
                            <div className="text-left">
                                <h3>
                                    {i18next.t('OUR_SPECIAL')}
                                    <br /> {i18next.t('COMMON_SERVICES')}
                                </h3>
                                <p>
                                    {i18next.t('COMMON_SERVICES_PAG')}
                                </p>
                            </div>
                            <div data-aos="fade-down" className={isDarkMode ? 'dark card-right' : 'card-right'}>
                                <img src={DevIcon} alt="Dev Websites" />
                                <div>
                                    <h4>{i18next.t('WEBSITE_DESIGN_AND_DEV')}</h4>
                                    <p>
                                        {i18next.t('WEBSITE_DESIGN_AND_DEV_PAG')}
                                    </p>
                                    <a href='/website-development'>{i18next.t('GET_STARTED')}</a>
                                </div>
                            </div>
                        </div>

                        <div className='cards-container' >
                            <div data-aos="fade-down" className={isDarkMode === true ? 'dark card' : 'card'}>
                                <img src={SocialIcon} alt="social media Icon" />
                                <h4>{i18next.t('SOCIAL_MEDIA_MARKETING')}</h4>
                                <p>
                                    {i18next.t('SOCIAL_MEDIA_MARKETING_PAG')}
                                </p>
                                <a href='/social-media'>{i18next.t('GET_STARTED')}</a>
                            </div>

                            <div data-aos="fade-down" data-aos-duration="200" className={isDarkMode === true ? 'dark card' : 'card'}>
                                <img src={DesignIcon} alt="Design" />
                                <h4>{i18next.t('DESIGN')}</h4>
                                <p>
                                    {i18next.t('DESIGN_PAG')}
                                </p>
                                <a href='/design'>{i18next.t('GET_STARTED')}</a>
                            </div>

                            <div data-aos="fade-down" data-aos-duration="400" className={isDarkMode === true ? 'dark card' : 'card'}>
                                <img src={MobileIcon} alt="Mobile Apps Development" />
                                <h4>{i18next.t('MOBILE_APPS')}</h4>
                                <p>
                                    {i18next.t('MOBILE_APPS_PAG')}
                                </p>
                                <a href='/mobile-development'>{i18next.t('GET_STARTED')}</a>
                            </div>

                            <div data-aos="fade-down" data-aos-duration="600" className={isDarkMode === true ? 'dark card' : 'card'}>
                                <img src={DesktopIcon} alt="Desktop App Dev" />
                                <h4>{i18next.t('DESKTOP_APPS')}</h4>
                                <p>
                                    {i18next.t('DESKTOP_APPS_PAG')}
                                </p>
                                <a href='/desktop-development'>{i18next.t('GET_STARTED')}</a>
                            </div>
                        </div>
                    </div>



                    <div className="store_new">

                        <div className="upper_container">
                            <h2 className='main_text'>HOT PRODUCTS</h2>
                            <p>Check out , our new hot deals added to our shop</p>
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