import React from 'react'
import Logo from '../../../Assets/Home/Navbar/WEBINA-Logo.png';
import './Navbar.scss'
import { MdLanguage, MdKeyboardArrowDown } from 'react-icons/md'
import { BsMoon } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'


const Navbar = ({ props }) => {
    return (
        <nav id='navbar'>

            <div className='navbar'>

                <div className='container'>
                    <div className='logo'>
                        <img src={Logo} alt="logo" />
                    </div>

                    <ul>
                        <li>Products <MdKeyboardArrowDown /></li>
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