import React, { useContext } from 'react'
import './Footer.scss'
import Logo from '../../../Assets/Home/Navbar/WEBINA-Logo.png'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'
import { ThemeContext } from '../../../Context/ThemeContext'

const Footer = () => {


    const { isDarkMode } = useContext(ThemeContext)

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

                    <p>WEBINA DIGITAL website builder offers a complete solution from enterprise-grade infrastructure and business features to
                        advanced SEO and marketing tools-enabling anyone to create and grow online.</p>
                    <a href='/privacy-policy'>Privacy Policy</a>
                    <a href='/contact'>Contact Us</a>
                </ul>
            </div>

            <div className='under-footer'>
                <div className='data'>
                    <h2>WEBINA DIGITAL LTD © 2023 All Rights Reserved</h2>
                    <p>Company Registration Number 14915092</p>
                </div>

                <div>
                    <a href='https://instagram.com/_webina'><FaInstagram /></a>
                    <a href='https://facebook.com/webinadigital'><FaFacebook /></a>
                    <a href='https://twitter.com/webina-digital'><FaTwitter /></a>
                    <a href='https://tiktok.com/webinadigital'><FaTiktok /></a>
                </div>
            </div>

        </footer>
    )
}

export default Footer