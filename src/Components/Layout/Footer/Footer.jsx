import React from 'react'
import './Footer.scss'
import Logo from '../../../Assets/Home/Navbar/WEBINA-Logo.png'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer>

            <div className='container'>
                <ul>
                    <h3>Product</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <h3>Product</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <h3>Product</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <img src={Logo} alt="logo" />

                    <p>The Wix website builder offers a complete solution from enterprise-grade infrastructure and business features to 
                        advanced SEO and marketing tools–enabling anyone to create and grow online.</p>
                    <a>about us</a>
                    <a>Contact Us</a>
                </ul>
            </div>

            <div className='under-footer'>
                <h2>WEBINA © 2023 All Rights Reserved</h2>

                <div>
                    <span><FaInstagram/></span>
                    <span><FaFacebook/></span>
                    <span><FaTwitter/></span>
                    <span><FaTiktok/></span>
                </div>
            </div>

        </footer>
    )
}

export default Footer