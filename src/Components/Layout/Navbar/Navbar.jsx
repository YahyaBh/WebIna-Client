import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png';
import LogoLight from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './Navbar.scss'
import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { BsListNested } from 'react-icons/bs';
import Ecommerce from '../../../Assets/Home/Navbar/Add to Cart-cuate.svg'
import { ThemeContext } from "../../../Context/ThemeContext";

const Navbar = ({ isOpen, transparent }) => {


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
        // Add event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])



    const handleScroll = () => {
        // Update the state based on scroll position
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };


    const handleAsideShow = () => {
        if (asideShow) {
            setAsideShow(false)
        } else {
            setAsideShow(true)
        }
    }

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <nav id='navbar' className={scrolled ? 'scrolled' : '' || transparent ? 'transparent' : ''}>
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
                        <a href='/' className='logo'>
                            <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                        </a>

                        <ul>
                            <li>
                                Products <MdKeyboardArrowDown />
                                <ul className="dropdown-menu">
                                    {/* <li onClick={e => SetselectedProduct('website')}>Website</li>
                                    <li onClick={e => SetselectedProduct('ui/ux')}>UI/UX Design</li>
                                    <li onClick={e => SetselectedProduct('mobile-apps')}>Mobile Application</li>
                                    <li onClick={e => SetselectedProduct('desktop-apps')} >Desktop Application</li>
                                    <li onClick={e => SetselectedProduct('games')}>Games</li>
                                    <li onClick={e => SetselectedProduct('social-media-design')}>Social Media Designing</li>
                                    <li onClick={e => SetselectedProduct('nfts-design')}>NFTs Designing</li> */}
                                </ul>
                            </li>
                            <li><a href='/maintanence'>Pricing</a></li>
                            <li><a href='/maintanence'>Blogs</a></li>
                            <li><a href='/maintanence'>About Us</a></li>
                            <li><a href='/maintanence'>FAQs</a></li>
                            <li><a href='/maintanence'>Hire Me</a></li>
                            <li><a href='/maintanence'>Contact Us</a></li>
                        </ul>

                        <div className='right-container'>
                            <div className='lang-mode'>
                                <MdLanguage />
                                {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                            </div>

                            <div className='sign-buttons'>
                                <button>
                                    <a href='/maintanence'>
                                        <BiUser />
                                        <h3>Sign In</h3>
                                    </a>
                                </button>

                                <button>
                                    <a href='/maintanence'>
                                        <FiUserPlus />
                                        <h3>Sign Up</h3>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


            <nav id='responsive-navbar'>

                <div className='main-show'>
                    <div className='logo'>
                        <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                    </div>

                    <div className='mode-res'>
                        <BsListNested onMouseEnter={handleAsideShow} />
                        {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
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