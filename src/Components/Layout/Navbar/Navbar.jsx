import React, { useEffect, useState } from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './Navbar.scss'
import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { BsMoon } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import Ecommerce from '../../../Assets/Home/Navbar/Add to Cart-cuate.svg'

const Navbar = ({ props }) => {


    const [selectedProduct, SetselectedProduct] = useState('');

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


    return (
        <nav id='navbar'>


            <div className={`modal-products ${selectedProduct ? 'active' : ''}`}>
                <div class="modal-content">
                    <span class="close" onClick={e => SetselectedProduct('')}>&times;</span>
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
                        <img src={Logo} alt="logo" />
                    </div>

                    <ul>
                        <li>
                            Products <MdKeyboardArrowDown />
                            <ul class="dropdown-menu">
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
                            <BsMoon />
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

    )
}

export default Navbar