import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png';
import LogoLight from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './Navbar.scss'
import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { BsListNested } from 'react-icons/bs';
import Ecommerce from '../../../Assets/Home/Navbar/Add to Cart-cuate.svg'
import Morocco from '../../../Assets/Home/Navbar/Languages/Flag_of_Morocco.svg.png'
import English from '../../../Assets/Home/Navbar/Languages/Flag_of_the_United_Kingdom.svg.png'
import French from '../../../Assets/Home/Navbar/Languages/Flag_of_France.svg.png'
import { ThemeContext } from "../../../Context/ThemeContext";
import AuthContext from '../../../Context/AuthContext';
import i18next from 'i18next';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = ({ isOpen, transparent }) => {


    const [scrolled, setScrolled] = useState(false);
    const [selectedProduct, SetselectedProduct] = useState('');
    const [asideShow, setAsideShow] = useState(false)
    const [language, setLanguage] = useState(false)
    const modalClassName = isOpen ? 'modal-animation active' : 'modal-animation';


    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const { isAuthenticated, user , logout} = AuthContext();

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


    const changeLang = (e) => {
        i18next.changeLanguage(e)
        setLanguage('')
    }


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
                                {i18next.t("PRODUCTS")} <MdKeyboardArrowDown />
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
                            <li><a href='/maintanence'>{i18next.t("CUSTOM")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("PRICING")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("BLOGS")}</a></li>
                            <li><a href='/about'>{i18next.t("ABOUT_US")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("FAQs")}</a></li>
                            <li><a href='/jobs'>{i18next.t("HIRE_ME")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("CONTACT_US")}</a></li>
                        </ul>

                        <div className='right-container'>
                            <div className='lang-mode'>
                                <div className="dropdown-container">
                                    <MdLanguage className='svg-dropdown' onClick={e => setLanguage(true)} />

                                    <div className="options">
                                        <div className="option" onClick={e => changeLang('en')}>
                                            <img src={English} alt="English" />
                                            <h3>English</h3>
                                        </div>
                                        <div className="option" onClick={e => changeLang('fr')}>
                                            <img src={French} alt="French" />
                                            <h3>Francais</h3>
                                        </div>
                                        <div className="option" onClick={e => changeLang('ar')}>
                                            <img src={Morocco} alt="Arabic" />
                                            <h3>العربية</h3>
                                        </div>
                                    </div>
                                </div>

                                {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                                <a href="/cart"><AiOutlineShoppingCart /></a>
                            </div>

                            {isAuthenticated ?
                                <li className='drop-down-user' >
                                    <img src={user.avatar} alt={user.name + ' profile'} />{user.name} <MdKeyboardArrowDown />
                                    <ul className="dropdown-menu">
                                        <li>{i18next.t("PROFILE")}</li>
                                        <li>{i18next.t("MY_RECENT")}</li>
                                        <li>{i18next.t("MY_FAVORITE")}</li>
                                        <li>{i18next.t("MY_ORDERS")}</li>
                                        <hr />
                                        <li onClick={logout()}>{i18next.t("LOGOUT")}</li>
                                    </ul>
                                </li>
                                :
                                <div className='sign-buttons'>
                                    <button>
                                        <a href='/login'>
                                            <BiUser />
                                            <h3>{i18next.t("SIGNIN")}</h3>
                                        </a>
                                    </button>

                                    <button>
                                        <a href='/register'>
                                            <FiUserPlus />
                                            <h3>{i18next.t("SIGNUP")}</h3>
                                        </a>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>


            <nav id='responsive-navbar'>

                <div className='main-show'>
                    <a href='/' className='logo'>
                        <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                    </a>

                    <div className='mode-res'>
                        <BsListNested onClick={handleAsideShow} />
                        {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                    </div>
                </div>

                <div className={asideShow ? 'aside-container div-active' : 'aside-container'}>
                    <aside className={asideShow ? 'aside-active' : ''}>

                        <ul className='list'>
                            <li>
                                {i18next.t("PRODUCTS")} <MdKeyboardArrowDown />
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
                            <li><a href='/maintanence'>{i18next.t("PRICING")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("BLOGS")}</a></li>
                            <li><a href='/about'>{i18next.t("ABOUT_US")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("FAQs")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("HIRE_ME")}</a></li>
                            <li><a href='/maintanence'>{i18next.t("CONTACT_US")}</a></li>
                        </ul>
                    </aside>
                </div>

            </nav>

        </>
    )
}

export default Navbar