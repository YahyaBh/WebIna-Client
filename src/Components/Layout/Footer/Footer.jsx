import React from 'react'
import './Footer.scss'
import Logo from '../../../Assets/Home/Navbar/WEBINA-Logo.png'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa'
import i18next from 'i18next'

const Footer = () => {


    return (
        <footer>

            <div className='container'>
                <ul>
                    <h3>{i18next.t("PRODUCTS")}</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <h3>{i18next.t("PRODUCTS")}</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <h3>{i18next.t("PRODUCTS")}</h3>

                    <li>Costumed websites</li>
                    <li>Website Templates</li>
                    <li>E-commerce websites</li>
                    <li>Portfolios</li>
                    <li>Blogs</li>
                </ul>

                <ul>
                    <img src={Logo} alt="logo" />

                    <p>{i18next.t("FOOTER_DESCRIPTION")}</p>
                    <a href='/privacy-policy'>{i18next.t("PRIVACY_POLICY")}</a>
                    <a href='/contact'>{i18next.t("CONTACT_US")}</a>
                </ul>
            </div>

            <div className='under-footer'>
                <div className='data'>
                    <h2>WEBINA DIGITAL LTD © 2023 All Rights Reserved</h2>
                    <p>Company Registration N. 14915092</p>
                </div>

                <div>
                    <a href='https://instagram.com/_webina' target='_blank' rel="noreferrer"><FaInstagram /></a>
                    <a href='https://facebook.com/webinadigital' target='_blank' rel="noreferrer"><FaFacebook /></a>
                    <a href='https://twitter.com/webina-digital' target='_blank' rel="noreferrer"><FaTwitter /></a>
                    <a href='https://tiktok.com/@webina.digital' target='_blank' rel="noreferrer"><FaTiktok /></a>
                </div>
            </div>

        </footer>
    )
}

export default Footer