import React, { Profiler, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-scroll';
import { MdAdsClick, MdOutlineEmojiEmotions, MdAlternateEmail } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";


import './Custom.scss'

import Loading from '../Loading/Loading'
import Navbar from '../Layout/Navbar/Navbar'
import Witch from '../../Assets/Custom/Wishes-cuate 1.svg'
import Footer from '../Layout/Footer/Footer';
import { BiPhoneCall } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';

const Custom = () => {

    const [loading, setLoading] = useState(true)


    useEffect(() => {


        setLoading(false)

    }, [])



    return (
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Custom Application</title>
                <meta name="description" content="Make your unique custom application , with the best price , and the highest quality , with WEBINA DIGITAL" />
                <link rel='canonical' content="/custom" />
            </Helmet>

            <Profiler id='custom-app'>

                {loading ? <Loading /> : ''}

                <Navbar />


                <div id='custom_product'>


                    <div className="header">

                        <img src={Witch} alt="Witch" />

                        <div>
                            <h1><span>Request everything you want</span> to create and leave <span>WEBINA DIGITAL</span> handle the rest</h1>

                            <Link className='button_request' to="web_pack"
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500} >REQUEST <MdAdsClick /><MdOutlineEmojiEmotions /></Link>
                        </div>
                    </div>



                    <div className="packs-container">


                        <div className="packs_web" name="web_pack">

                            <h2><span>WEBSITE</span> APPLICATION
                                <br />
                                <p>WEBINA DIGITAL PACKS</p>
                            </h2>


                            <div className="cards-container">
                                <div className="card">

                                </div>

                                <div className="card middle">

                                </div>

                                <div className="card">

                                </div>
                            </div>

                        </div>

                    </div>


                    <div className="contact_us">
                        <h2>YOU NEED A CUSTOM SOFTWARE FOR YOUR <span>ENTERPRISE</span> ?</h2>


                        <div className="contact">

                            <button className="card" onClick={() => navigator.clipboard.writeText('contact@webinadigital.com')}>
                                <div className="image">
                                    <MdAlternateEmail />
                                </div>


                                <div className="container">
                                    <h4>contact@webinadigital.com <FaRegCopy /></h4>
                                </div>
                            </button>

                            <a href='https://wa.me/+212620792331' target='_blank' rel="noreferrer" className="card" >
                                <div className="image">
                                    <BsWhatsapp />
                                </div>


                                <div className="container">
                                    <h4>+212 620792331</h4>
                                </div>
                            </a>

                            <a href='tel:+212620792331' target='_blank' rel="noreferrer" className="card" onClick={() => navigator.clipboard.writeText('+212620792331')}>
                                <div className="image">
                                    <BiPhoneCall />
                                </div>


                                <div className="container">
                                    <h4>+212 620792331 <FaRegCopy /></h4>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                <Footer />

            </Profiler>

        </>
    )
}

export default Custom