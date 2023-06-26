import React, { Profiler, useEffect, useRef, useState } from 'react'
import './Home.scss'
import Navbar from '../Layout/Navbar/Navbar'
import ImageComponent from '../Layout/ImageComponenet/ImageComponent'
import { BsArrowRight } from 'react-icons/bs'
import { HiOutlineArrowRight } from 'react-icons/hi'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import BackGroundContainer from '../../Assets/Home/Section 1 Main/ComputerSectionHome.svg'
import Computer1 from '../../Assets/Home/Section 1 Main/computer.png';
import Computer2 from '../../Assets/Home/Section 1 Main/panel.png';
import WebInaPhone from '../../Assets/Home/Section 2/iPhone7.png'

import floatingRightHatDark from '../../Assets/Home/Section 2/FloatingRightHatDark.png';
import floatingRightHat from '../../Assets/Home/Section 2/FloatingRightHat.png';

import OrnamentHoriz from '../../Assets/Home/Section 2/OrnamentHoriz.png';
import OrnamentHorizDark from '../../Assets/Home/Section 2/OrnamentHorizDark.png';
import OrnamentUp from '../../Assets/Home/Section 2/OrnamentUp.png';
import OrnamentUpDark from '../../Assets/Home/Section 2/OrnamentUpDark.png';


import DevIcon from '../../Assets/Home/Section 2/dev-icon.svg'
import SocialIcon from '../../Assets/Home/Section 2/social-icon.svg';

import SEO from '../../Assets/Home/SEO Section/seo.png'

import BlogTest from '../../Assets/Home/Section Blog/maxresdefault-test.png'

import LeftTopArrow from '../../Assets/Home/Perf-Section/Arrow-Left-Top.png';
import LeftBottomArrow from '../../Assets/Home/Perf-Section/Arrow-Left-Bottom.png';
import RightTopArrow from '../../Assets/Home/Perf-Section/Arrow-Right-Top.png';
import RightBottomArrow from '../../Assets/Home/Perf-Section/Arrow-Right-Bottom.png';
import TestImage from '../../Assets/Home/Perf-Section/TestImage.png';

import Aos from 'aos';
import 'aos/dist/aos.css';
import Cookies from 'js-cookie';
import Loading from '../Loading/Loading';
import { BiArrowFromLeft } from 'react-icons/bi'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { Pagination, Navigation } from "swiper";

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(Cookies.get('mode'));
    const [emailGetStarted, setEmailGetStarted] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [currentImage, setCurrentImage] = useState(Computer1);
    const [isFadeIn, setIsFadeIn] = useState(false);
    const [neonButton, setNeonButton] = useState(false);

    const tiltRef = useRef(null);
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        const el = tiltRef.current;
        const elSec = imageRef.current;


        const height = el.clientHeight;
        const width = el.clientWidth;

        const xVal = e.nativeEvent.layerX;
        const yVal = e.nativeEvent.layerY;

        const yRotation = 8 * ((xVal - width / 2) / width);
        const xRotation = -8 * ((yVal - height / 2) / height);

        const yRotationSec = 3 * ((xVal - width / 2) / width);
        const xRotationSec = -3 * ((yVal - height / 2) / height);

        const transformValue = `perspective(500px) scale(1) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        const transformValueSec = `perspective(500px) scale(1) rotateX(${-xRotationSec}deg) rotateY(${-yRotationSec}deg)`;

        el.style.transition = 'transform 0.5s ease-out';
        el.style.transform = transformValue;
        elSec.style.transition = 'transform 0.5s ease-out';
        elSec.style.transform = transformValueSec;

    };

    const handleMouseOut = () => {
        const el = tiltRef.current;
        const elSec = imageRef.current;

        el.style.transition = 'transform 0.5s ease-out'; // Add transition for smooth animation
        el.style.transform = 'perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)';
        elSec.style.transition = 'transform 0.5s ease-out'; // Add transition for smooth animation
        elSec.style.transform = 'perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)';
    };

    const handleMouseDown = () => {
        const el = tiltRef.current;
        el.style.transform = 'perspective(500px) scale(0.97) rotateX(0) rotateY(0)';

        const elSec = imageRef.current;
        elSec.style.transform = 'perspective(500px) scale(0.99) rotateX(0) rotateY(0)';
    };

    const handleMouseUp = () => {
        const el = tiltRef.current;
        el.style.transform = 'perspective(500px) scale(1.03) rotateX(0) rotateY(0)';

        const elSec = imageRef.current;
        elSec.style.transform = 'perspective(500px) scale(1.01) rotateX(0) rotateY(0)';
    };

    const handleScroll = () => {
        // Update the state based on scroll position
        if (window.pageYOffset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };


    useEffect(() => {

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1200);

    }, [darkMode])


    useEffect(() => {

        Aos.init();

        window.addEventListener('scroll', handleScroll);

        if (Cookies.get('mode') === true) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }

        const interval = setInterval(() => {
            setCurrentImage((prevImage) => {
                if (prevImage === Computer1) {
                    return Computer2;
                } else {
                    return Computer1;
                }
            });
            setIsFadeIn(true);

            setTimeout(() => {
                setIsFadeIn(false);
            }, 1000); // Adjust the fade-in duration (in milliseconds) as needed
        }, 7000);

        return () => {

            clearInterval(interval);

        };

    }, []);


    const handleButtonClicked = (newValue) => {
        setDarkMode(newValue)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    };

    return (
        <Profiler id='Home'>

            {loading ? <Loading /> : ''}

            <Navbar target={'home'} onButtonClick={handleButtonClicked} />

            <div id='Home'>
                <section id='section-main'>

                    <div className='main-container'>
                        <div className="background-grad">
                            <div className='left-container'>
                                <h1 data-aos="fade-down">GET <span>YOUR</span> WEBSITE</h1>

                                <p data-aos="fade-down">We are gonna create a well developed and designed website from your own choice and it will exactly as you desire and want .
                                    The website you want will be created with high quality ,
                                    our team which is formed with experienced programmers and designers will take of every corner.</p>


                                <div className='email-get-started'>
                                    <input data-aos="fade-down" onChange={e => setEmailGetStarted(e.target.value)} type="email" name='email' id='name' placeholder='Enter Email Address' minLength={'8'} />
                                    <button data-aos="fade-down" data-aos-duration="500" className={emailGetStarted ? 'active' : ''} disabled={emailGetStarted ? false : true}>GET STARTED</button>
                                </div>

                                <div data-aos="fade-down" className='undertext' onMouseEnter={e => setNeonButton(true)} onMouseLeave={e => setNeonButton(false)}>
                                    <BsArrowRight />
                                    <h4>CHANGE YOUR <br /> IDEA TO A BUSINESS</h4>
                                </div>

                            </div>

                            <div className='right-container'
                                data-aos="fade-left"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseOut}
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}>
                                <img
                                    ref={imageRef}
                                    className={`over-top-image ${isFadeIn ? 'fade-in' : ''}`}
                                    onLoad={() => setIsFadeIn(true)}
                                    src={currentImage}
                                    alt="computer-science" />
                                <img ref={tiltRef} src={BackGroundContainer} alt="container" />
                            </div>


                            <div data-aos="fade-down" className='res-undertext' onMouseEnter={e => setNeonButton(true)} onMouseLeave={e => setNeonButton(false)}>
                                <BsArrowRight />
                                <h4>CHANGE YOUR <br /> IDEA TO A BUSINESS</h4>
                            </div>

                        </div>
                    </div>
                </section>

                <section id='section-second' className={scrolled ? 'active' : ''}>
                    <AnchorLink href='#section-secondary' className={`zipper-pull`}>
                        <div className="scroll-downs">
                            <div className="mousey">
                                <div className="scroller"></div>
                            </div>
                        </div>
                        <h4>Scroll</h4>
                    </AnchorLink>

                    <div className="background-all-divs">
                        <div className='section-container' id='section-secondary'>

                            <div className='test-example'>
                                <div className='ht' data-aos="fade-right">

                                    <div className='responsive-why-web'>
                                        <h2>WHY WEBINA</h2>
                                        <p>WebIna is a comapny that helps you make your dreams easier and build you a full application for your business , you can easily choose any website from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
                                        <button>GET STARTED</button>
                                    </div>

                                    <img className='webina-phone' src={WebInaPhone} alt="webina phone" />

                                    <img className='OrnamentHoriz-res' src={darkMode ? OrnamentHorizDark : OrnamentHoriz} alt="OrnamentHoriz" />
                                    <img className='OrnamentUp' src={darkMode ? OrnamentUpDark : OrnamentUp} alt="OrnamentUp" />



                                </div>

                                <div className='th' data-aos="fade-up">



                                    <img className='floating-right' src={darkMode ? floatingRightHatDark : floatingRightHat} alt="webina floating hat" />

                                    <h1>MAKE IT <span>DIGITAL</span></h1>

                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        It has survived not only five centuries, but also.
                                    </p>

                                    <button>Get Started</button>

                                    <img className='OrnamentHoriz' src={darkMode ? OrnamentHorizDark : OrnamentHoriz} alt="OrnamentHoriz" />
                                </div>
                            </div>


                        </div>


                        <div className="second-section-container" id='second-section'>
                            <div className="cards-text-container" >
                                <div className="text-left">
                                    <h3>
                                        Our Digital <br /> Marketing Expertise
                                    </h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                </div>
                                <div data-aos="fade-down" className={darkMode ? 'dark card-right' : 'card-right'}>
                                    <img src={DevIcon} alt="Dev Websites" />
                                    <div>
                                        <h4>Website design & Development</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                            eirmod tempor Lorem ipsum dolor sit
                                        </p>
                                        <button>GET STARTED</button>
                                    </div>
                                </div>
                            </div>

                            <div className='cards-container' >
                                <div data-aos="fade-down" className={darkMode === true ? 'dark card' : 'card'}>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>Social Media Marketing</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>

                                <div data-aos="fade-down" data-aos-duration="200" className={darkMode === true ? 'dark card' : 'card'}>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>Social Media Marketing</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>

                                <div data-aos="fade-down" data-aos-duration="400" className={darkMode === true ? 'dark card' : 'card'}>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>Social Media Marketing</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>

                                <div data-aos="fade-down" data-aos-duration="600" className={darkMode === true ? 'dark card' : 'card'}>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>Social Media Marketing</h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                        eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>
                            </div>
                        </div>



                        <div className='seo-section' id='seo-section'>

                            <div data-aos="fade-down" className='text-container'>
                                <h2>Get The First Position In
                                    The Google SEO</h2>

                                <p>We Will Help Your Client To Reach Your Website  Easily In The First Link In Google</p>

                                <button>GET YOUR WEBSITE</button>
                            </div>


                            <img data-aos="fade-up" src={SEO} alt="seo-pic" />

                        </div>


                        <div className='make-yoursite-container' id='make-site'>
                            <div data-aos="fade-right" className='text-container'>
                                <h3>Create your website as you wish in any field and with any <span>design</span> <HiOutlineArrowRight /></h3>
                            </div>

                            <button data-aos="fade-right">ORDER NOW</button>
                        </div>


                        <div className='new-skills-section' id='skills-section'>
                            <div className='left-container' data-aos="fade-right">
                                <h3>Get inspired, <br />
                                    gain new skills <br />
                                    and see what's <br />
                                    <span> trending</span>
                                </h3>

                                <button>Explore the Blog</button>
                            </div>

                            <div className="right-container">
                                <div className='blog-card' data-aos="fade-down">
                                    <div className='blog-body'>
                                        <ImageComponent className="image" src={BlogTest} alt="blog" />
                                        <h5>How to design a website in 2023 FIGMA</h5>
                                    </div>
                                </div>
                                <div className='blog-card' data-aos="fade-down" data-aos-duration="200">
                                    <div className='blog-body'>
                                        <ImageComponent className="image" src={BlogTest} alt="blog" />
                                        <h5>How to design a website in 2023 FIGMA</h5>
                                    </div>
                                </div>
                                <div className='blog-card' data-aos="fade-down" data-aos-duration="300">
                                    <div className='blog-body'>
                                        <ImageComponent className="image" src={BlogTest} alt="blog" />
                                        <h5>How to design a website in 2023 FIGMA</h5>
                                    </div>
                                </div>
                                <div className='blog-card' data-aos="fade-down" data-aos-duration="500">
                                    <div className='blog-body'>
                                        <ImageComponent className="image" src={BlogTest} alt="blog" />
                                        <h5>How to design a website in 2023 FIGMA</h5>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='performance-section' id='perf-section'>
                            <div className='container'>

                                <div className='top-container'>
                                    <div className='container-corner' data-aos="fade-down">
                                        <h3>High quality designs</h3>
                                        <span>01</span>
                                    </div>

                                    <div className='container-corner' data-aos="fade-down">
                                        <span>02</span>
                                        <h3>Full stack development</h3>
                                    </div>
                                </div>


                                <div className='center-contaienr' data-aos="zoom-in">
                                    <div className='container-left'>
                                        <img src={LeftTopArrow} alt="left-top-arrow" />

                                        <img src={LeftBottomArrow} alt="left-bottom-arrow" />
                                    </div>

                                    <div className="container-center">
                                        <img src={TestImage} alt="center" />
                                    </div>

                                    <div className="container-right">
                                        <img src={RightTopArrow} alt="right-bottom-arrow" />

                                        <img src={RightBottomArrow} alt="right-bottom-arrow" />
                                    </div>
                                </div>

                                <div className="bottom-container">
                                    <div className='container-corner' data-aos="fade-up">
                                        <h3>0 Function issues</h3>
                                        <span>03</span>
                                    </div>

                                    <div className='container-corner' data-aos="fade-up">
                                        <span>04</span>
                                        <h3>0 Language mistakes</h3>
                                    </div>
                                </div>

                            </div>
                        </div>



                        <div className="countdown-section" id='countdown-section'>
                            <div className='left-section'>
                                <h2 data-aos="fade-right">UP TO <span>75%</span></h2>

                                <div className="timer">
                                    <div className='time-sec' data-aos="fade-down">
                                        11
                                    </div>
                                    <span> : </span>
                                    <div className='time-sec' data-aos="fade-down">
                                        22
                                    </div>
                                    <span> : </span>

                                    <div className='time-sec' data-aos="fade-down">
                                        02
                                    </div>
                                    <span> : </span>

                                    <div className='time-sec' data-aos="fade-down">
                                        59
                                    </div>
                                </div>

                                <button data-aos="fade-right">GET STARTED</button>

                            </div>


                            <div className="right-section">
                                <h2 data-aos="fade-down">Everything <br />
                                    You Need to <br />
                                    <span>Create a Website</span>
                                </h2>
                            </div>
                        </div>

                        <div className='background-sections-double'>
                            <div className="contact-section">
                                <h2>We're here for you</h2>


                                <div className='container'>
                                    <div>
                                        <h3>Get answers</h3>
                                        <p>Watch tutorials and read detailed articles in the Webina Help Center.</p>

                                        <a href="/help-center">Go to Help Center <BiArrowFromLeft /></a>
                                    </div>

                                    <div>
                                        <h3>Contact us</h3>
                                        <p>Get support by chat or schedule a call with a Customer Care Expert</p>

                                        <a href="/help-center">Chat with Us <BiArrowFromLeft /></a>
                                    </div>

                                    <div>
                                        <h3>Hire a pro</h3>
                                        <p>Get help at any stage from site creation to online growth.</p>

                                        <a href="/help-center">Browse All Services <BiArrowFromLeft /></a>
                                    </div>

                                </div>
                            </div>


                            <div className="slider-container">

                                <div className='left-container'>
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={30}
                                        loop={true}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        navigation={{
                                            prevEl: '.swiper-button-prev',
                                            nextEl: '.swiper-button-next',
                                        }}
                                        modules={[Pagination, Navigation]}
                                        className="swipper-container"

                                    >
                                        <div>
                                            <SwiperSlide>Slide 1</SwiperSlide>
                                            <SwiperSlide>Slide 2</SwiperSlide>
                                            <SwiperSlide>Slide 3</SwiperSlide>
                                            <SwiperSlide>Slide 4</SwiperSlide>
                                            <SwiperSlide>Slide 5</SwiperSlide>
                                            <SwiperSlide>Slide 6</SwiperSlide>
                                            <SwiperSlide>Slide 7</SwiperSlide>
                                            <SwiperSlide>Slide 8</SwiperSlide>
                                            <SwiperSlide>Slide 9</SwiperSlide>
                                        </div>

                                        <div className='swiper-button-prev'></div>
                                        <div className='swiper-button-next'></div>
                                    </Swiper>



                                </div>
                                <div className="right-container">
                                    <div className='card'>
                                        <p>We help you build a website <br />
                                            Expandable and upgradable <br />
                                            To keep pace with<span> the development <br />
                                                of your business.</span></p>
                                    </div>

                                    <div className='card'>
                                        <p>We offer complete design solutions <br />
                                            Website development and <br />
                                            <span> Optimized <br />
                                                for optimal performance.</span></p>
                                    </div>

                                    <div className='card'>
                                        <p>We care about the fine details <br />
                                            Attractive <br />
                                            design to ensure an<span> experience <br />
                                                Unique and distinctive user.</span></p>
                                    </div>
                                </div>

                            </div>


                            <div className='customers-feedback'>
                                <div className='header-feed'>
                                    <div>
                                        <h2>Our Customer <span>Feedback</span></h2>
                                        <p>Don't take our word for it. Trust our customers</p>
                                    </div>

                                    <div>
                                        <button>next</button>
                                        <button>previous</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

            </div >
        </Profiler >

    )
}

export default Home