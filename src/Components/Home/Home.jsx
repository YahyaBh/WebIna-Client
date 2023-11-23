import React, {
    Profiler,
    useContext,
    useEffect,
    useRef,
    useState,
    lazy,
    Suspense,
} from 'react';
import Navbar from '../Layout/Navbar/Navbar';
import { useCountdown } from '../Layout/Timer/Timer';
import { ThemeContext } from '../../Context/ThemeContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { Helmet } from 'react-helmet-async';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/core';
import './styles.scss';
import Footer from '../Layout/Footer/Footer';
import { Tooltip } from 'react-tooltip';
import Loading from '../Loading/Loading';

import 'swiper/css';
import 'swiper/css/navigation';
import 'aos/dist/aos.css';

import AuthContext from '../../Context/AuthContext';



// Unique imports
import BackGroundContainer from '../../Assets/Home/Section 1 Main/ComputerSectionHome.svg';
import Computer1 from '../../Assets/Home/Section 1 Main/computer.webp';
import Computer2 from '../../Assets/Home/Section 1 Main/panel.webp';
import Computer3 from '../../Assets/Home/Section 1 Main/boy-image.svg';
import Computer4 from '../../Assets/Home/Section 1 Main/3d-shapes.svg';
import WebInaPhone from '../../Assets/Home/Section 2/iphone7.webp';
import floatingRightHatDark from '../../Assets/Home/Section 2/FloatingRightHatDark.png';
import floatingRightHat from '../../Assets/Home/Section 2/FloatingRightHat.png';
import OrnamentHoriz from '../../Assets/Home/Section 2/ornamenthoriz.webp';
import OrnamentHorizDark from '../../Assets/Home/Section 2/OrnamentHorizDark.png';
import OrnamentUp from '../../Assets/Home/Section 2/ornamentup.webp';
import OrnamentUpDark from '../../Assets/Home/Section 2/OrnamentUpDark.png';
import DevIcon from '../../Assets/Home/Section 2/dev-icon.svg';
import SocialIcon from '../../Assets/Home/Section 2/social-icon.svg';
import DesignIcon from '../../Assets/Home/Section 2/design-icon.svg';
import MobileIcon from '../../Assets/Home/Section 2/mobile-icon.svg';
import DesktopIcon from '../../Assets/Home/Section 2/desktop-icon.svg';
import SEO from '../../Assets/Home/SEO Section/seo.webp';
import LeftTopArrow from '../../Assets/Home/Perf-Section/Arrow-Left-Top.png';
import LeftBottomArrow from '../../Assets/Home/Perf-Section/Arrow-Left-Bottom.png';
import RightTopArrow from '../../Assets/Home/Perf-Section/Arrow-Right-Top.png';
import RightBottomArrow from '../../Assets/Home/Perf-Section/Arrow-Right-Bottom.png';
import TestFeed from '../../Assets/Home/FeedBack Section/TestFeed.png';
import ContactImg from '../../Assets/Home/Contact Section/at-dynamic-color.svg';
import VideoCoding from '../../Assets/Home/Slide Section/pexels-mikhail-nilov-7989667 (720p).mp4';

import { SiRubyonrails, SiAdobepremierepro, SiAdobeaftereffects, SiVisualstudio, SiAndroidstudio, SiMysql, SiCplusplus, SiFlutter, SiBlender, SiNuxtdotjs } from 'react-icons/si';
import { DiRuby } from 'react-icons/di';
import { FaPhp, FaBootstrap, FaSwift, FaFigma, FaDocker, FaPython, FaSketch, FaReact } from 'react-icons/fa'
import { BsArrowRight, BsWordpress, BsUnity } from 'react-icons/bs'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { IoIosArrowForward, IoIosArrowBack, IoLogoJavascript, IoLogoCss3, IoMdStar, IoMdStarOutline } from 'react-icons/io'
import { BiArrowFromLeft } from 'react-icons/bi'


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [emailGetStarted, setEmailGetStarted] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [isFadeIn, setIsFadeIn] = useState(false);
    const [targetDate, setTargetDate] = useState('');
    const [videoShort, setvideoShort] = useState(
        'http://localhost:8000/images/admins/home/edit/video/1700222447.mp4'
    );
    const [testiomonials, setTestiomonials] = useState([]);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [currentImage, setCurrentImage] = useState(Computer1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { isDarkMode } = useContext(ThemeContext);
    const { http, csrf, isAuthenticated } = AuthContext();
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    const tiltRef = useRef(null);
    const imageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        import('aos').then((aos) => {
            aos.init();
        });

        if (isAuthenticated) {
            navigate('/store/home')
        } else {

            window.addEventListener('scroll', handleScroll);

            getHomeData();

        }
    }, []);

    useEffect(() => {
        const images = [Computer1, Computer2, Computer3, Computer4];
        const interval = setInterval(() => {
            const currentIndex = images.indexOf(currentImage);
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentImage(images[nextIndex]);
        }, 7000);
        return () => clearInterval(interval);
    }, [currentImage]);

    const getHomeData = async () => {
        try {
            const res = await http.get('/api/home');
            setTestiomonials(res.data.testimonials);
            setProjects(res.data.projects);
            setBlogs(res.data.blogs);
            setTargetDate(res.data.homeData[0].targetDate);
            setvideoShort(res.data.homeData[0].imageGif);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

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
        el.style.transition = 'transform 0.5s ease-out';
        el.style.transform = 'perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)';
        elSec.style.transition = 'transform 0.5s ease-out';
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
        if (window.pageYOffset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const handleContactMessage = async (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && message !== '') {
            const contactData = new FormData();
            contactData.append('name', name);
            contactData.append('email', email);
            contactData.append('message', message);
            csrf();
            try {
                const res = await http.post('/api/contact', contactData);
                Swal.fire({
                    title: 'Thank You !',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonColor: 'var(--black-color)',
                });
            } catch (err) {
                Swal.fire('Error', err.response.data.message, 'error');
            }
        }
    };

    const handleEmail = async () => {
        if (emailGetStarted !== '') {
            const emailFormData = new FormData();
            emailFormData.append('email', emailGetStarted);
            setEmailGetStarted('');
            csrf();
            try {
                const res = await http.post('/api/register/email', emailFormData, {
                    withCredentials: true,
                });
                Swal.fire({
                    title: 'Thank You',
                    text: 'We Will Let You Know As Soon As The Website Is Ready , Be Safe !',
                    icon: 'success',
                    confirmButtonColor: 'var(--black-color)',
                });
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonColor: 'red',
                });
            }
        }
    };

    const ImageComponent = lazy(() => import('../Layout/ImageComponenet/ImageComponent'));

    return (
        <Profiler id='Home'>

            <Helmet>
                <title>WEBINA DIGITAL</title>
                <meta name="description" content="Welcome To Webina Digital - Web Development Company, the #1 Digital Company" />
                <link rel='canonical' content="/" />
            </Helmet>


            {loading ? <Loading /> : ''}

            <Navbar target={'home'} />

            <div id='Home'>
                <div>
                    <section id='section-main'>

                        <div className='main-container'>
                            <div className="background-grad">
                                <div className='left-container'>
                                    <h1 data-aos="fade-down">{i18next.t('GET')}<span> {i18next.t('YOUR')} </span>{i18next.t('WEBSITE')}</h1>

                                    <p data-aos="fade-down">{i18next.t('HOME_DESCRIPTION')}</p>

                                    <a href='/maintanence' className='res-button-start'>{i18next.t('GET_STARTED')}</a>


                                    <div id='email-get-started' className='email-get-started'>
                                        <input data-aos="fade-down" onChange={e => setEmailGetStarted(e.target.value)} type="email" name='email' id='email-get-started-input' placeholder={i18next.t("ENTER_EMAIL_ADDRESS")} minLength={'8'} />
                                        <button onClick={emailGetStarted ? e => handleEmail() : null} className={emailGetStarted ? 'active' : ''} disabled={emailGetStarted ? false : true}>{i18next.t('GET_STARTED')}</button>
                                    </div>


                                    <div data-aos="fade-down" className='undertext' id='res-undertext'>
                                        <BsArrowRight />
                                        <h4>{i18next.t('CHANGE_YOUR')} <br /> {i18next.t('IDEA_TO_A_BUSINESS')}</h4>
                                    </div>

                                </div>

                                <div className='right-container changing-image-container'
                                    data-aos="fade-left"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseOut}
                                    onMouseDown={handleMouseDown}
                                    onMouseUp={handleMouseUp}>
                                    <img
                                        rel="preload"
                                        ref={imageRef}
                                        className={`over-top-image changing-image ${isFadeIn ? 'fade-in' : ''}`}
                                        onLoad={() => setIsFadeIn(true)}
                                        src={currentImage}
                                        alt="computer-science" />
                                    <img ref={tiltRef} src={BackGroundContainer} alt="container" />
                                </div>



                                <div data-aos="fade-down" className='res-undertext' >
                                    <BsArrowRight />
                                    <h4>{i18next.t('CHANGE_YOUR')} <br /> {i18next.t('IDEA_TO_A_BUSINESS')}</h4>
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
                            <h4>{i18next.t('SCROLL')}</h4>
                        </AnchorLink>

                        <div className="background-all-divs">
                            <div className='section-container' id='section-secondary'>

                                <div className='test-example'>
                                    <div className='ht' data-aos="fade-right">

                                        <div className='responsive-why-web'>
                                            <h2>{i18next.t('WHY_WEBINA')}</h2>
                                            <p>{i18next.t('WHY_WEBINA_PAG')}</p>
                                            <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
                                        </div>

                                        <img className='webina-phone' src={WebInaPhone} alt="webina phone" />

                                        <img className='OrnamentHoriz-res' src={isDarkMode ? OrnamentHorizDark : OrnamentHoriz} alt="OrnamentHoriz" />
                                        <img className='OrnamentUp' src={isDarkMode ? OrnamentUpDark : OrnamentUp} alt="OrnamentUp" />



                                    </div>

                                    <div className='th' data-aos="fade-up">



                                        <img className='floating-right' src={isDarkMode ? floatingRightHatDark : floatingRightHat} alt="webina floating hat" />

                                        <h2>{i18next.t('WHY')} <span>{i18next.t('WEBINA')}</span></h2>

                                        <p>
                                            {i18next.t('WHY_WEBINA_PAG_SEC')}
                                        </p>

                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>

                                        <img className='OrnamentHoriz' src={isDarkMode ? OrnamentHorizDark : OrnamentHoriz} alt="OrnamentHoriz" />
                                    </div>
                                </div>


                            </div>


                            <div className="second-section-container" id='second-section'>
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
                                            <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
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
                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
                                    </div>

                                    <div data-aos="fade-down" data-aos-duration="200" className={isDarkMode === true ? 'dark card' : 'card'}>
                                        <img src={DesignIcon} alt="Design" />
                                        <h4>{i18next.t('DESIGN')}</h4>
                                        <p>
                                            {i18next.t('DESIGN_PAG')}
                                        </p>
                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
                                    </div>

                                    <div data-aos="fade-down" data-aos-duration="400" className={isDarkMode === true ? 'dark card' : 'card'}>
                                        <img src={MobileIcon} alt="Mobile Apps Development" />
                                        <h4>{i18next.t('MOBILE_APPS')}</h4>
                                        <p>
                                            {i18next.t('MOBILE_APPS_PAG')}
                                        </p>
                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
                                    </div>

                                    <div data-aos="fade-down" data-aos-duration="600" className={isDarkMode === true ? 'dark card' : 'card'}>
                                        <img src={DesktopIcon} alt="Desktop App Dev" />
                                        <h4>{i18next.t('DESKTOP_APPS')}</h4>
                                        <p>
                                            {i18next.t('DESKTOP_APPS_PAG')}
                                        </p>
                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>
                                    </div>
                                </div>
                            </div>



                            <div className='seo-section' id='seo-section'>

                                <div data-aos="fade-down" className='text-container'>
                                    <h2>{i18next.t('FIRST_SEO')}</h2>

                                    <p>{i18next.t('FIRST_SEO_PAG')}</p>

                                    <a href='/store/home'>{i18next.t('GET_YOUR_WEBSITE')}</a>
                                </div>


                                <img data-aos="fade-up" src={SEO} alt="seo-pic" />

                            </div>


                            <div className='make-yoursite-container' id='make-site'>
                                <div data-aos="fade-right" className='text-container'>
                                    <h3><div>{i18next.t('CREATE_YOUR')} <span>{i18next.t('DESIGN_W')}</span></div> <HiOutlineArrowRight /></h3>
                                </div>

                                <a href='/store/home' data-aos="fade-right">{i18next.t('ORDER_NOW')}</a>
                            </div>


                            <div className='new-skills-section' id='skills-section'>
                                <div className='left-container' data-aos="fade-right">
                                    <h3>{i18next.t('INSPIRED')} <br />
                                        {i18next.t('SKILLS')}<br />
                                        {i18next.t('SEE_WHATS')}<br />
                                        {i18next.t('TRENDING')}<span> </span>
                                    </h3>

                                    <a href='/blogs'>{i18next.t('EXPLORE_BLOGS')}</a>
                                </div>

                                <div className="right-container">
                                    {blogs?.map((blog, index) => (
                                        <div key={index} className='blog-card' data-aos="fade-down" data-aos-duration="500">
                                            <div className='blog-body'>
                                                <Suspense>
                                                    <ImageComponent className="image" src={blog.image} alt={blog.title} />
                                                </Suspense>
                                                <div className="right-cont">
                                                    <h5>{blog.name.substring(0, 25) + '...'}</h5>
                                                    <p>{blog.description.substring(0, 150) + '...'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>


                            <div className='performance-section' id='perf-section'>
                                <div className='container'>

                                    <div className='top-container'>
                                        <div className='container-corner' data-aos="fade-down">
                                            <h3>{i18next.t('HIGH_QUALITY_DESIGN')}</h3>
                                            <span>01</span>
                                        </div>

                                        <div className='container-corner' data-aos="fade-down">
                                            <span>02</span>
                                            <h3>{i18next.t('FULL_STACK_DEVELOPMENT')}</h3>
                                        </div>
                                    </div>


                                    <div className='center-contaienr' data-aos="zoom-in">
                                        <div className='container-left'>
                                            <img src={LeftTopArrow} alt="left-top-arrow" className={isDarkMode ? '' : 'dark'} />

                                            <img src={LeftBottomArrow} alt="left-bottom-arrow" />
                                        </div>

                                        <div className="container-center">

                                            <video autoPlay muted loop>
                                                <source src={videoShort} type="video/mp4" />
                                                <source src={videoShort} type="video/ogg" />
                                            </video>

                                        </div>

                                        <div className="container-right">
                                            <img src={RightTopArrow} alt="right-bottom-arrow" className={isDarkMode ? '' : 'dark'} />

                                            <img src={RightBottomArrow} alt="right-bottom-arrow" />
                                        </div>
                                    </div>

                                    <div className="bottom-container">
                                        <div className='container-corner' data-aos="fade-up">
                                            <h3>{i18next.t('FUNCTION_ISSUES')}</h3>
                                            <span>03</span>
                                        </div>

                                        <div className='container-corner' data-aos="fade-up">
                                            <span>04</span>
                                            <h3>{i18next.t('LANGUAGE_MISTAKES')}</h3>
                                        </div>
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

                                    <a href='/store/home' data-aos="fade-right">{i18next.t('GET_STARTED')}</a>

                                </div>


                                <div className="right-section">
                                    <h2 data-aos="fade-down">{i18next.t('EVERYTHING')} <br />
                                        {i18next.t('YOU_NEED_TO')} <br />
                                        <span>{i18next.t('CREATE_A_WEBSITE')}</span>
                                    </h2>
                                </div>
                            </div>


                            <div className="background-sections-techs-pros">

                                <div className="projects-section">
                                    <h2>{i18next.t('RECENT')} <span>{i18next.t('PROJECTS')}</span></h2>


                                    <div className="projects-container">


                                        {projects.map((project, index) => (
                                            <div key={index} className="card">
                                                <img src={project.image} alt={project.name + '' + index} />

                                                <h3>{project.name}</h3>

                                                <div className='categories'>
                                                    <span>{project.category}</span>
                                                </div>

                                                <a href={`/project/${project.name}`} className='details-button'>{i18next.t("SHOW_DETAILS")}</a>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="technologies-section">
                                    <h2>{i18next.t('TECHS')}</h2>


                                    <div className="technologies-container">
                                        <Tooltip id="nuxt-tooltip" />
                                        <SiNuxtdotjs data-tooltip-id="nuxt-tooltip" data-tooltip-content="Nuxt Js" />
                                        <Tooltip id="ruby-tooltip" />
                                        <DiRuby data-tooltip-id="ruby-tooltip" data-tooltip-content="Ruby" />
                                        <Tooltip id="ruby-on-rails-tooltip" />
                                        <SiRubyonrails data-tooltip-id="ruby-on-rails-tooltip" data-tooltip-content="Ruby On Rails" />
                                        <Tooltip id="php-tooltip" />
                                        <FaPhp data-tooltip-id="php-tooltip" data-tooltip-content="Php" />
                                        <Tooltip id="adobe-premier-pro-tooltip" />
                                        <SiAdobepremierepro data-tooltip-id="adobe-premier-pro-tooltip" data-tooltip-content="Adobe Premiere Pro" />
                                        <Tooltip id="javascript-tooltip" />
                                        <IoLogoJavascript data-tooltip-id="javascript-tooltip" data-tooltip-content="JavaScript" />
                                        <Tooltip id="bootstrap-tooltip" />
                                        <FaBootstrap data-tooltip-id="bootstrap-tooltip" data-tooltip-content="Bootstrap" />
                                        <Tooltip id="css-tooltip" />
                                        <IoLogoCss3 data-tooltip-id="css-tooltip" data-tooltip-content="Css" />
                                        <Tooltip id="c-plus-plus-tooltip" />
                                        <SiCplusplus data-tooltip-id="c-plus-plus-tooltip" data-tooltip-content="C++" />
                                        <Tooltip id="adobe-after-effects-tooltip" />
                                        <SiAdobeaftereffects data-tooltip-id="adobe-after-effects-tooltip" data-tooltip-content="Adobe After Effects" />
                                        <Tooltip id="vs-code-tooltip" />
                                        <SiVisualstudio data-tooltip-id="vs-code-tooltip" data-tooltip-content="Visual Studio Code" />
                                        <Tooltip id="wordpress-tooltip" />
                                        <BsWordpress data-tooltip-id="wordpress-tooltip" data-tooltip-content="WordPress" />
                                    </div>
                                    <div className="technologies-container">
                                        <Tooltip id="figma-tooltip" />
                                        <FaFigma data-tooltip-id="figma-tooltip" data-tooltip-content="Figma" />
                                        <Tooltip id="flutter-tooltip" />
                                        <SiFlutter data-tooltip-id="flutter-tooltip" data-tooltip-content="Flutter" />
                                        <Tooltip id="docker-tooltip" />
                                        <FaDocker data-tooltip-id="docker-tooltip" data-tooltip-content="Docker" />
                                        <Tooltip id="android-studio-tooltip" />
                                        <SiAndroidstudio data-tooltip-id="android-studio-tooltip" data-tooltip-content="Android Studio" />
                                        <Tooltip id="blender-tooltip" />
                                        <SiBlender data-tooltip-id="blender-tooltip" data-tooltip-content="Blender" />
                                        <Tooltip id="mysql-tooltip" />
                                        <SiMysql data-tooltip-id="mysql-tooltip" data-tooltip-content="MySQL" />
                                        <Tooltip id="python-tooltip" />
                                        <FaPython data-tooltip-id="python-tooltip" data-tooltip-content="Python" />
                                        <Tooltip id="swift-tooltip" />
                                        <FaSwift data-tooltip-id="swift-tooltip" data-tooltip-content="Swift" />
                                        <Tooltip id="unity-tooltip" />
                                        <BsUnity data-tooltip-id="unity-tooltip" data-tooltip-content="Unity" />
                                        <Tooltip id="sketch-tooltip" />
                                        <FaSketch data-tooltip-id="sketch-tooltip" data-tooltip-content="Sketch" />
                                        <Tooltip id="react-tooltip" />
                                        <FaReact data-tooltip-id="react-tooltip" data-tooltip-content="ReactJs" />
                                    </div>
                                </div>
                            </div>

                            <div className={`background-sections-double ${isDarkMode ? 'dark-section' : ''}`} >
                                <div className="contact-section">
                                    <h2>{i18next.t('WE_ARE_HERE_FOR_YOU')}</h2>


                                    <div className='container'>
                                        <div>
                                            <h3>{i18next.t('GET_ANSWERS')}</h3>
                                            <p>{i18next.t('GET_ANSWERS_PAG')}</p>

                                            <a href="/contact/help">{i18next.t('GO_TO_HELP_CENTER')} <BiArrowFromLeft /></a>
                                        </div>

                                        <div>
                                            <h3>{i18next.t('CONTACT_US')}</h3>
                                            <p>{i18next.t('CONTACT_US_PAG')}</p>

                                            <a href="/contact/chat">{i18next.t('CHAT_WITH_US')} <BiArrowFromLeft /></a>
                                        </div>

                                        <div>
                                            <h3>{i18next.t('HIRE_A_PRO')}</h3>
                                            <p>{i18next.t('HIRE_A_PRO_PAG')}</p>

                                            <a href="/contact">{i18next.t('BROWSE_ALL_SERVICES')} <BiArrowFromLeft /></a>
                                        </div>

                                    </div>
                                </div>


                                <div className="slider-container">

                                    <div className='left-container' id='container-pics'>

                                        <div className="video-container">
                                            <video autoPlay loop muted>
                                                <source src={VideoCoding} alt="video" type='video/mp4' />
                                            </video>
                                        </div>

                                    </div>


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
                                        <a href='/store/home'>{i18next.t('GET_STARTED')}</a>

                                    </div>


                                </div>


                                <div className="background-div-fed-cont">
                                    <div className='customers-feedback'>
                                        {feedback(testiomonials)}

                                        <div className="swiper-pag"></div>

                                    </div>


                                    <div className='contact-us'>

                                        <h2>{i18next.t('CONTACT_US')}</h2>
                                        <div className='container'>
                                            <div className='left-container'>
                                                <form onSubmit={e => handleContactMessage(e)}>
                                                    <input type="text" placeholder={i18next.t("NAME")} name='name' id='name' onChange={e => setName(e.target.value)} value={name} />

                                                    <input type="email" placeholder={i18next.t("EMAIL")} name='email' id='email' onChange={e => setEmail(e.target.value)} value={email} />

                                                    <textarea name="message" id="message" placeholder={i18next.t("MESSAGE")} cols="30" rows="10" onChange={e => setMessage(e.target.value)} value={message} />

                                                    <button type='submit' >{i18next.t('SEND_MESSAGE')}</button>
                                                </form>
                                            </div>


                                            <div className="right-container">
                                                <img src={ContactImg} alt="contact-img" />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>

                    </section>
                </div>
            </div >
        </Profiler >

    )
}

export default Home





const feedback = (testiomonials) => {

    const RatingStars = ({ rating, maxRating }) => {
        const filledStars = Array.from({ length: rating }, (_, index) => (
            <IoMdStar key={index} />
        ));

        const emptyStars = Array.from({ length: maxRating - rating }, (_, index) => (
            <IoMdStarOutline key={index} />
        ));

        return (
            <div>
                {filledStars}
                {emptyStars}
            </div>
        );
    };
    return (
        <>
            <div className='header-feed'>
                <div>
                    <h2>{i18next.t("OUR_CUSTOMER")} <span>{i18next.t("FEEDBACK")}</span></h2>
                    <p>{i18next.t("FEEDBACK_PAG")}</p>
                </div>

                <div className='swiper-buttons'>
                    <div className='swiper-button-pre'><IoIosArrowBack /> {i18next.t("PREVIOUS")}</div>
                    <div className='swiper-button-nex'>{i18next.t("NEXT")} <IoIosArrowForward /></div>
                </div>
            </div>


            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                pagination={{
                    el: '.swiper-pag',
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.swiper-button-pre',
                    nextEl: '.swiper-button-nex',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {testiomonials?.map((testiomonial, index) =>
                    <SwiperSlide key={index}>
                        <div className="container">
                            <div className='header'>
                                <img src={testiomonial.image ? testiomonial.image : TestFeed} alt={"FeedBack Pic" + index} />


                                <div className='stars-feed'>
                                    <RatingStars rating={testiomonial.rating} maxRating={5} />
                                </div>
                            </div>

                            <div className='body'>
                                <h3>{testiomonial.name}</h3>
                                <p>{testiomonial.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>



        </>
    )
}