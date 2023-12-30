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

import { BsCart2, BsFillStarFill, BsStar, BsStarHalf, BsVectorPen } from 'react-icons/bs'
import { FaHotjar } from "react-icons/fa";
import { IoRestaurantOutline, IoTicketOutline } from "react-icons/io5";
import { RiHotelLine, RiGalleryLine } from "react-icons/ri"
import { MdOutlineStorefront } from "react-icons/md"
import { BiArrowFromLeft, BiArrowToRight } from 'react-icons/bi'
import { PiDotsThreeOutline } from 'react-icons/pi';
import { TbApps } from "react-icons/tb";

import ADS from '../../Assets/Home/Projects Section/TestProjects.png'
import i18next from 'i18next'
import Footer from '../Layout/Footer/Footer'

import VideoHomeStore from '../../Assets/Store/Home/Blurred Video of Scripts Being Typed.mp4';
import VideoCoding from '../../Assets/Home/Slide Section/pexels-mikhail-nilov-7989667 (720p).mp4'


import { ThemeContext } from '../../Context/ThemeContext'
import Aos from 'aos'



import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './styles.scss'


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useCountdown } from '../Layout/Timer/Timer'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


const HomeStore = () => {


    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [new_products, setNewProducts] = useState([]);
    const [top_products, setTopProducts] = useState([]);
    const [ads, setAds] = useState([]);
    const [targetDate, setTargetDate] = useState('');


    const [days, hours, minutes, seconds] = useCountdown(targetDate)


    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    
    useEffect(() => {
        Aos.init();

        if (Cookies.get('__F_ACCESS')) {
            navigate('/welcome')
        } else {
            return
        }

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

                                    <a href='/store' className='get_started'><BiArrowToRight /> GET STARTED</a>
                                    <a href='/custom' className='custom_product'><TbApps /> CUSTOM APPLICATION</a>

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
                            <h2 className='main_text'><FaHotjar /><span>HOT</span> PRODUCTS</h2>
                            <p>Check out , our new hot deals added to our shop</p>
                        </div>

                        <Swiper
                            slidesPerView={3}
                            spaceBetween={10}
                            navigation={true}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >

                            <SwiperSlide>
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
                            </SwiperSlide>

                            <SwiperSlide>
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
                            </SwiperSlide>

                            <SwiperSlide>
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
                            </SwiperSlide>

                            <SwiperSlide>
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
                            </SwiperSlide>
                        </Swiper>

                        <a className='view_all' href='/store'>View All</a>
                    </div>



                    <div className="store_ad">
                        <img src={ADS} alt="ad" />
                    </div>

                    <div className="store_top_selled">

                        <div className="upper_container">
                            <h2 className='main_text'><span>RECENT</span> PROJECTS</h2>
                            <p>Find the most recent developed products</p>
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


                            <a className='view_all' href='/store'>View All</a>

                        </div>




                    </div>


                    <div className="container-text">
                        <h2>Create Your Dream Website</h2>
                        <h2>With Your Own Touch</h2>

                        <p>What kind of website would you like to have?</p>

                        <div className="container-select">
                            <a className="card" href='/store' >
                                <h2><IoRestaurantOutline /> Restaurant</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><RiHotelLine /> Hotel</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><MdOutlineStorefront /> Online Store</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><BsVectorPen /> Blog</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><RiGalleryLine /> Portfolio</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><IoTicketOutline /> Event</h2>
                            </a>

                            <a className="card" href='/store'>
                                <h2><PiDotsThreeOutline /> Other</h2>
                            </a>
                        </div>

                    </div>

                    <div className="slider-container">




                        <div className="right-container">
                            <div className='card'>
                                <p>{i18next.t('WE_HELP_YOU_BUILD')} <br />
                                    {i18next.t('EXPANDABLE_AND_UPGRADABLE')} <br />
                                    {i18next.t('TO_KEEP_PACE')}<span> {i18next.t('THE_DEVELOPMENT')} <br />
                                        {i18next.t('OF_YOUR_BUSINESS')}</span></p>
                            </div>

                            <div className='card'>
                                <p>{i18next.t('WE_OFFER_COMPLETE')} <br />
                                    {i18next.t('WEBSITE_DEV')}<br />
                                    <span> {i18next.t('OPTIMIZED')} <br />
                                        {i18next.t('FOR_OPTIMAL_PERF')}</span></p>
                            </div>

                            <div className='card'>
                                <p>{i18next.t('WE_CARE_ABOUT')} <br />
                                    {i18next.t('ATTRACTIVE')} <br />
                                    {i18next.t('DESIGN_TO')}<span> {i18next.t('EXPERIENCE')} <br />
                                        {i18next.t('UNIQUE_AND')}</span></p>
                            </div>
                            <a href='/store'>{i18next.t('GET_STARTED')}</a>

                        </div>

                        <div className='left-container' id='container-pics'>

                            <div className="video-container">
                                <video autoPlay loop muted>
                                    <source src={VideoCoding} alt="video" type='video/mp4' />
                                </video>
                            </div>

                        </div>
                    </div>

                    <div className="countdown-section" id='countdown-section'>
                        <div className='left-section'>
                            <h2 data-aos="fade-right">{i18next.t('UP_TO')}<span>40%</span></h2>

                            <div className="timer">
                                <div className='time-sec' data-aos="fade-down">
                                    {days}
                                </div>
                                <span> : </span>
                                <div className='time-sec' data-aos="fade-down">
                                    {hours}
                                </div>
                                <span> : </span>

                                <div className='time-sec' data-aos="fade-down">
                                    {minutes}
                                </div>
                                <span> : </span>

                                <div className='time-sec' data-aos="fade-down">
                                    {seconds}
                                </div>
                            </div>

                            <a href='/store' data-aos="fade-right">{i18next.t('GET_STARTED')}</a>

                        </div>


                        <div className="right-section">
                            <h2 data-aos="fade-down">{i18next.t('EVERYTHING')} <br />
                                {i18next.t('YOU_NEED_TO')} <br />
                                <span>{i18next.t('CREATE_A_WEBSITE')}</span>
                            </h2>
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