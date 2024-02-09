import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png';
import LogoLight from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import WEBSITEIMAGENAV from '../../../Assets/Home/Navbar/Domain names-bro.svg';

import './Navbar.scss'


import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BiArrowToRight, BiLogOut, BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { BsListNested } from 'react-icons/bs';
import { CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { MdHistory } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';



import Morocco from '../../../Assets/Home/Navbar/Languages/Flag_of_Morocco.svg.png'
import English from '../../../Assets/Home/Navbar/Languages/Flag_of_the_United_Kingdom.svg.png'
import French from '../../../Assets/Home/Navbar/Languages/Flag_of_France.svg.png'
import { ThemeContext } from "../../../Context/ThemeContext";
import AuthContext from '../../../Context/AuthContext';
import i18next from 'i18next';

const Navbar = ({ isOpen, transparent }) => {


    const [scrolled, setScrolled] = useState(false);
    const [asideShow, setAsideShow] = useState(false)
    const [language, setLanguage] = useState(false)


    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const { isAuthenticated, user, logout, cartCounter } = AuthContext();


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

                <div className='navbar'>
                    <div className='container'>
                        <a href='/' className='logo'>
                            <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                        </a>

                        <ul>
                            <li className='dropdown-list'>
                                Services <MdKeyboardArrowDown />
                                <div className="container-drop">
                                    <ul className="dropdown-menu">
                                        <li >Website</li>
                                        <li >UI/UX Design</li>
                                        <li >Mobile Application</li>
                                        <li >Desktop Application</li>
                                        <li >Games</li>
                                        <li >Social Media Designing</li>
                                        <li >NFTs Designing</li>
                                    </ul>
                                    <div className="ele-container">
                                        <div className="cont-li">
                                            <img src={WEBSITEIMAGENAV} alt="" />
                                            <button>GET STARTED <BiArrowToRight /></button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li><a href='/custom'>{i18next.t("CUSTOM")}</a></li>
                            <li><a href='/custom'>{i18next.t("PRICING")}</a></li>
                            <li><a href='/blogs'>{i18next.t("BLOGS")}</a></li>
                            <li><a href='/about'>{i18next.t("ABOUT_US")}</a></li>
                            <li><a href='/faqs'>{i18next.t("FAQs")}</a></li>
                            <li><a href='/jobs'>{i18next.t("HIRE_ME")}</a></li>
                            <li><a href='/contact'>{i18next.t("CONTACT_US")}</a></li>
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

                                {isAuthenticated ? <a href="/cart"><AiOutlineShoppingCart />{cartCounter > 0 ? <span>{cartCounter}</span> : null}</a> : ''}
                            </div>

                            {isAuthenticated ?
                                <li className='drop-down-user' >
                                    <img src={user.avatar} alt={user.name + ' profile'} />{user.name} <MdKeyboardArrowDown />
                                    <ul className="dropdown-menu">
                                        <li ><a href="/profile"><CiUser /> {i18next.t("PROFILE")}</a></li>
                                        <li><a href="/recent"><MdHistory /> {i18next.t("MY_RECENT")}</a></li>
                                        <li><a href="/favourite"><CiHeart /> {i18next.t("MY_FAVORITE")}</a></li>
                                        <li><a href="/purchases"><CiShoppingCart /> {i18next.t("MY_ORDERS")}</a></li>
                                        <hr />
                                        <li onClick={e => logout()}><BiLogOut /> {i18next.t("LOGOUT")}</li>
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


            <nav id='responsive-navbar-s'>

                <div className='main-show'>
                    <a href='/' className='logo'>
                        <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                    </a>

                    <div className='mode-res'>
                        <div className="aside-swit">
                            <BsListNested onClick={handleAsideShow} />
                        </div>
                        {isAuthenticated ? <a href="/cart"><AiOutlineShoppingCart />{cartCounter > 0 ? <span>{cartCounter}</span> : null}</a> : ''}
                        {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                        {isAuthenticated ?
                            <li className='drop-down-user' >
                                <img src={user.avatar} alt={user.name + ' profile'} />
                                <ul className="dropdown-menu">
                                    <li ><a href="/profile">{i18next.t("PROFILE")}</a></li>
                                    <li><a href="/recent">{i18next.t("MY_RECENT")}</a></li>
                                    <li><a href="/favourite">{i18next.t("MY_FAVORITE")}</a></li>
                                    <li><a href="/purchases">{i18next.t("MY_ORDERS")}</a></li>
                                    <hr />
                                    <li onClick={e => logout()}>{i18next.t("LOGOUT")}</li>
                                </ul>
                            </li>
                            :
                            ''}
                    </div>
                </div>

                <div className={asideShow ? 'aside-container div-active' : 'aside-container'}>
                    <aside className={asideShow ? 'aside-active' : ''}>

                        <ul className='list'>
                            <li className='dropdown-trigger'>
                                Services <MdKeyboardArrowDown />
                                <ul className="dropdown-menu">
                                    <li >Website</li>
                                    <li >UI/UX Design</li>
                                    <li >Mobile Application</li>
                                    <li  >Desktop Application</li>
                                    <li >Games</li>
                                    <li >Social Media Designing</li>
                                    <li >NFTs Designing</li>
                                </ul>
                            </li>
                            <li><a href='/custom'>{i18next.t("CUSTOM")}</a></li>
                            <li><a href='/custom'>{i18next.t("PRICING")}</a></li>
                            <li><a href='/blogs'>{i18next.t("BLOGS")}</a></li>
                            <li><a href='/about'>{i18next.t("ABOUT_US")}</a></li>
                            <li><a href='/faqs'>{i18next.t("FAQs")}</a></li>
                            <li><a href='/jobs'>{i18next.t("HIRE_ME")}</a></li>
                            <li><a href='/contact'>{i18next.t("CONTACT_US")}</a></li>

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

                        </ul>



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
                    </aside>
                </div>

            </nav>

        </>
    )
}

export default Navbar