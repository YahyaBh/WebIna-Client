import React, { useEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png';
import LogoLight from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './Navbar.scss'
import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { BsListNested } from 'react-icons/bs';
import Ecommerce from '../../../Assets/Home/Navbar/Add to Cart-cuate.svg'
import Cookies from 'js-cookie';

const Navbar = ({ isOpen, onButtonClick }) => {


    const [mode_dark, setModeDark] = useState();
    const [scrolled, setScrolled] = useState(false);
    const [selectedProduct, SetselectedProduct] = useState('');
    const [asideShow, setAsideShow] = useState(false)
    const modalClassName = isOpen ? 'modal-animation active' : 'modal-animation';


    useEffect(() => {
        const disableScroll = (event) => {
            event.preventDefault();
        };


        if (selectedProduct) {
            // Disable scrolling when the component mounts and the state is not empty
            document.body.style.overflow = 'hidden';
            document.addEventListener('wheel', disableScroll);
        }

        return () => {
            // Enable scrolling and remove event listener when the component unmounts
            document.body.style.overflow = 'auto';
            document.removeEventListener('wheel', disableScroll);
        };
    }, [selectedProduct]);


    useEffect(() => {

        if (Cookies.get('mode')) {
            Cookies.set('mode', true)
            setModeDark(true);
            document.documentElement.style.setProperty('--primary-color-dark', '#000000');
            document.documentElement.style.setProperty('--light-color', '#1e1e1e');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--secondary-color', '#1e1e1e');
            document.documentElement.style.setProperty('--cards-color', '#F9EA9B');


            document.getElementsByClassName('background-grad');

            document.documentElement.style.setProperty('transition', 'all 8s ease');

            setTimeout(() => {
                document.documentElement.style.setProperty('transition', '');
            }, 8000);


        } else {
            Cookies.set('mode', false)
            setModeDark(false);
            document.documentElement.style.setProperty('--primary-color-dark', '#FFE662');
            document.documentElement.style.setProperty('--light-color', '#fff');
            document.documentElement.style.setProperty('--black-color', '#1e1e1e');
            document.documentElement.style.setProperty('--secondary-color', '#fff');
            document.documentElement.style.setProperty('--cards-color', '#131313');



            document.documentElement.style.setProperty('transition', 'all 8s ease');

            setTimeout(() => {
                document.documentElement.style.setProperty('transition', '');
            }, 8000);
        }

        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };



    }, []);



    const handleScroll = () => {
        // Update the state based on scroll position
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };






    const handleModeChange = () => {
        if (mode_dark) {
            Cookies.set('mode', false);
            setModeDark(false);
            onButtonClick(false);
            document.documentElement.style.setProperty('--primary-color-dark', '#FFE662');
            document.documentElement.style.setProperty('--light-color', '#fff');
            document.documentElement.style.setProperty('--black-color', '#1e1e1e');
            document.documentElement.style.setProperty('--secondary-color', '#fff');
            document.documentElement.style.setProperty('--cards-color', '#131313');
        } else {
            Cookies.set('mode', true);
            setModeDark(true);
            onButtonClick(true);
            document.documentElement.style.setProperty('--primary-color-dark', '#000000');
            document.documentElement.style.setProperty('--light-color', '#1e1e1e');
            document.documentElement.style.setProperty('--black-color', '#fff');
            document.documentElement.style.setProperty('--secondary-color', '#1e1e1e');
            document.documentElement.style.setProperty('--cards-color', '#F9EA9B');
        }
    };


    const handleAsideShow = () => {
        if (asideShow) {
            setAsideShow(false)
        } else {
            setAsideShow(true)
        }
    }

    return (
        <>
            <nav id='navbar' className={scrolled ? 'scrolled' : ''}>
                <div className={`modal-products ${modalClassName}  ${selectedProduct ? 'active' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={e => SetselectedProduct('')}>&times;</span>
                        <h2>Categories</h2>
                        <div className='categories-container'>
                            <div className='category'>
                                <img src={Ecommerce} alt="E-commerce" />
                                <h3>E-commerce</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa saepe molestiae, ipsum consequatur aperiam.</p>
                            </div>

                            <div className='category'>
                                <img src={Ecommerce} alt="E-commerce" />
                                <h3>E-commerce</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa saepe molestiae, ipsum consequatur aperiam.</p>
                            </div>

                            <div className='category'>
                                <img src={Ecommerce} alt="E-commerce" />
                                <h3>E-commerce</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa saepe molestiae, ipsum consequatur aperiam.</p>
                            </div>

                            <div className='category'>
                                <img src={Ecommerce} alt="E-commerce" />
                                <h3>E-commerce</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa saepe molestiae, ipsum consequatur aperiam.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='navbar'>
                    <div className='container'>
                        <div className='logo'>
                            <img src={!mode_dark ? Logo : LogoLight} alt="logo" />
                        </div>

                        <ul>
                            <li>
                                Products <MdKeyboardArrowDown />
                                <ul className="dropdown-menu">
                                    <li onClick={e => SetselectedProduct('website')}>Website</li>
                                    <li onClick={e => SetselectedProduct('ui/ux')}>UI/UX Design</li>
                                    <li onClick={e => SetselectedProduct('mobile-apps')}>Mobile Application</li>
                                    <li onClick={e => SetselectedProduct('desktop-apps')} >Desktop Application</li>
                                    <li onClick={e => SetselectedProduct('games')}>Games</li>
                                    <li onClick={e => SetselectedProduct('social-media-design')}>Social Media Designing</li>
                                    <li onClick={e => SetselectedProduct('nfts-design')}>NFTs Designing</li>
                                </ul>
                            </li>
                            <li>Pricing</li>
                            <li>Blogs</li>
                            <li>About Us</li>
                            <li>FAQs</li>
                            <li>Hire Me</li>
                            <li>Contact Us</li>
                        </ul>

                        <div className='right-container'>
                            <div className='lang-mode'>
                                <MdLanguage />
                                {mode_dark ? <FaSun onClick={e => handleModeChange()} /> : <FaMoon onClick={e => handleModeChange()} />}
                            </div>

                            <div className='sign-buttons'>
                                <button>
                                    <BiUser />
                                    <h3>Sign In</h3>
                                </button>

                                <button>
                                    <FiUserPlus />
                                    <h3>Sign Up</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <nav id='responsive-navbar'>

                <div className='main-show'>
                    <div className='logo'>
                        <img src={!mode_dark ? Logo : LogoLight} alt="logo" />
                    </div>

                    <div className='mode-res'>
                        <BsListNested onMouseEnter={handleAsideShow} />
                        {mode_dark ? <FaSun onClick={e => handleModeChange()} /> : <FaMoon onClick={e => handleModeChange()} />}
                    </div>
                </div>

                <div className='aside-container'>
                    <div className={asideShow ? 'div-active' : ''}></div>
                    <aside className={asideShow ? 'active' : ''} onMouseLeave={handleAsideShow}>

                    </aside>
                </div>

            </nav>

        </>
    )
}

export default Navbar