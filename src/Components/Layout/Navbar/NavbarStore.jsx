import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png';
import LogoLight from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './NavbarStore.scss'
import { FaMoon, FaSun } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { BsList } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import Ecommerce from '../../../Assets/Home/Navbar/Add to Cart-cuate.svg'
import { ThemeContext } from "../../../Context/ThemeContext";
import AuthContext from '../../../Context/AuthContext';
import Profile from '../../../Assets/profiles/default.svg'
import { MdKeyboardArrowDown } from 'react-icons/md';


const NavbarStore = ({ isOpen, transparent }) => {


    const [scrolled, setScrolled] = useState(false);
    const [selectedProduct, SetselectedProduct] = useState('');
    const [asideShow, setAsideShow] = useState(false)
    const modalClassName = isOpen ? 'modal-animation active' : 'modal-animation';

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const { isAuthenticated, user } = AuthContext();

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


    return (
        <>
            <nav id='store-navbar' className={scrolled ? 'scrolled' : '' || transparent ? 'transparent' : ''}>
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

                        <div className='left-container'>
                            <BsList onClick={handleAsideShow} />
                            <a href='/' className='logo'>
                                <img src={isDarkMode ? LogoLight : Logo} alt="logo" />
                            </a>

                        </div>



                        <div className='right-container'>


                            <div className='lang-mode'>
                                <AiOutlineSearch />
                                {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                                <AiOutlineShoppingCart />
                            </div>

                            {isAuthenticated ?
                                <li className='drop-down-user' >
                                    <img src={Profile} alt={user.name + 'profile'} />{user.name} <MdKeyboardArrowDown />
                                    <ul className="dropdown-menu">
                                        <li>Profile</li>
                                        <li>My Recent</li>
                                        <li>My Favourite</li>
                                        <li>My Orders</li>
                                        <hr />
                                        <li><a href="/logout">Logout</a></li>
                                    </ul>
                                </li>
                                :
                                <div className='sign-buttons'>
                                    <button>
                                        <a href='/login'>
                                            <BiUser />
                                            <h3>Sign In</h3>
                                        </a>
                                    </button>

                                    <button>
                                        <a href='/register'>
                                            <FiUserPlus />
                                            <h3>Sign Up</h3>
                                        </a>
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>


        </>
    )
}

export default NavbarStore