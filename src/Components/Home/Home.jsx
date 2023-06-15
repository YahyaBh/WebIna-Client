import React, { Profiler, useEffect, useRef, useState } from 'react'
import './Home.scss'
import Navbar from '../Layout/Navbar/Navbar'
import { BsArrowRight } from 'react-icons/bs'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import BackGroundContainer from '../../Assets/Home/Section 1 Main/ComputerSectionHome.svg'
import Computer1 from '../../Assets/Home/Section 1 Main/computer.png';
import Computer2 from '../../Assets/Home/Section 1 Main/panel.png';
import WebInaPhone from '../../Assets/Home/Section 2/iPhone7.png'
import floatingRightHat from '../../Assets/Home/Section 2/FloatingRightHat.png';
import OrnamentUp from '../../Assets/Home/Section 2/OrnamentUp.png'
import OrnamentHoriz from '../../Assets/Home/Section 2/OrnamentHoriz.png';
import DevIcon from '../../Assets/Home/Section 2/dev-icon.svg'
import SocialIcon from '../../Assets/Home/Section 2/social-icon.svg';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

    const [emailGetStarted, setEmailGetStarted] = useState('');
    const [scrolled, setScrolled] = useState(false);

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

    const [currentImage, setCurrentImage] = useState(Computer1);
    const [isFadeIn, setIsFadeIn] = useState(false);
    const [neonButton, setNeonButton] = useState(false);

    useEffect(() => {

        Aos.init();


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

    useEffect(() => {

        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

    }, [])


    const handleScroll = () => {
        // Update the state based on scroll position
        console.log(window.pageYOffset);
        if (window.pageYOffset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    return (
        <Profiler id='Home'>

            <Navbar target={'home'} />

            <div id='Home'>
                <section id='section-main'>

                    <div className='main-container'>
                        <div className="background-grad">
                            <div className='left-container'>
                                <h1>GET <span>YOUR</span> WEBSITE</h1>

                                <p>We are gonna create a well developed and designed website from your own choice and it will exactly as you desire and want .
                                    The website you want will be created with high quality ,
                                    our team which is formed with experienced programmers and designers will take of every corner.</p>


                                <div className='email-get-started'>
                                    <input onChange={e => setEmailGetStarted(e.target.value)} type="email" name='email' id='name' placeholder='Enter Email Address' minLength={'8'} />
                                    <button className={emailGetStarted ? 'active' : ''} disabled={emailGetStarted ? false : true}>GET STARTED</button>
                                </div>

                                <div className='undertext' onMouseEnter={e => setNeonButton(true)} onMouseLeave={e => setNeonButton(false)}>
                                    <BsArrowRight />
                                    <h4>CHANGE YOUR <br /> IDEA TO A BUSINESS</h4>
                                </div>

                            </div>

                            <div className='right-container'

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


                            <div className='res-undertext' onMouseEnter={e => setNeonButton(true)} onMouseLeave={e => setNeonButton(false)}>
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

                                    <img className='OrnamentHoriz-res' src={OrnamentHoriz} alt="OrnamentHoriz" />
                                    <img className='OrnamentUp' src={OrnamentUp} alt="OrnamentUp" />



                                </div>

                                <div className='th' data-aos="fade-up">



                                    <img className='floating-right' src={floatingRightHat} alt="webina floating hat" />

                                    <h1>MAKE IT <span>DIGITAL</span></h1>

                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        It has survived not only five centuries, but also.
                                    </p>

                                    <button>Get Started</button>

                                    <img className='OrnamentHoriz' src={OrnamentHoriz} alt="OrnamentHoriz" />
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
                                <div className='card-right'>
                                    <img src={DevIcon} alt="Dev Websites" />
                                    <div>
                                        <h4>Website design & Development</h4>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit</p>
                                        <button>GET STARTED</button>
                                    </div>
                                </div>
                            </div>

                            <div className='cards-container' >
                                <div className='card'>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>
                                        Social Media Marketing
                                    </h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>
                                <div className='card'>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>
                                        Social Media Marketing
                                    </h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>
                                <div className='card'>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>
                                        Social Media Marketing
                                    </h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>
                                <div className='card'>
                                    <img src={SocialIcon} alt="social media Icon" />
                                    <h4>
                                        Social Media Marketing
                                    </h4>
                                    <p>
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit
                                    </p>
                                    <button>GET STARTED</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </Profiler>

    )
}

export default Home