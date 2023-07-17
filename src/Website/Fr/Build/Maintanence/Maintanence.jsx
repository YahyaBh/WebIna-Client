import React, { Profiler, useContext, useEffect, useRef, useState } from 'react'
import './Maintanence.scss'
import Navbar from '../../../Components/Layout/Navbar/Navbar'
import Designers from '../../Assets/UnderDevelopment/Maintanence/Designers.svg'
import DesignersDark from '../../Assets/UnderDevelopment/Maintanence/Designers-dark.svg'
import Client from '../../Assets/UnderDevelopment/Maintanence/Client-Feed.svg'
import ClientDark from '../../Assets/UnderDevelopment/Maintanence/Client-Feed-dark.svg'
import { RiArrowGoBackFill } from 'react-icons/ri'
import LinkedIn from '../../Assets/UnderDevelopment/Maintanence/linkedin.png'
import Facebook from '../../Assets/UnderDevelopment/Maintanence/facebook.png'
import Instagram from '../../Assets/UnderDevelopment/Maintanence/instagram.png'
import TikTok from '../../Assets/UnderDevelopment/Maintanence/Tik Tok.png'
import Whatsapp from '../../Assets/UnderDevelopment/Maintanence/whatsapp.png'
import Email from '../../Assets/UnderDevelopment/Maintanence/Social Media/Gmail.png'
import Phone from '../../Assets/UnderDevelopment/Maintanence/Group 486.png'
import RightLayer from '../../Assets/UnderDevelopment/Maintanence/rightLayer.png'
import LeftLayer from '../../Assets/UnderDevelopment/Maintanence/leftLayer.png'
import RightLayerDark from '../../Assets/UnderDevelopment/Maintanence/rightLayer-dark.png'
import LeftLayerDark from '../../Assets/UnderDevelopment/Maintanence/leftLayer-dark.png'
import { RiUserFollowLine } from 'react-icons/ri'
import Footer from '../../../Components/Layout/Footer/Footer'
import { Tooltip } from 'react-tooltip'
import { ThemeContext } from '../../../Context/ThemeContext'
import { IoMdClose } from 'react-icons/io'
import { AiOutlineBell } from 'react-icons/ai'
import luxyMin from 'luxy.js';
import Loading from '../../../Components/Loading/Loading'
import { BiPhone } from 'react-icons/bi'
import AuthContext from '../../../Context/AuthContext'
import Swal from 'sweetalert2'





const Maintanence = () => {

    const { isDarkMode } = useContext(ThemeContext);


    const [activeModalSub, setActiveModalSub] = useState(false);
    const [loading, setLoading] = useState(true);
    const [emailIn, setEmail] = useState('');

    const { csrf, http } = AuthContext();

    const ActiveSubModal = () => {
        if (activeModalSub) {
            setActiveModalSub(false)
        } else {
            setActiveModalSub(true)
        }
    }

    useEffect(() => {
        if (window.screen.width > 780) {
            luxyMin.init({
                wrapper: '#luxy',
                wrapperSpeed: 0.04
            });
        }

        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [])

    const handleEmail = async () => {
        if (emailIn !== '') {
            const email = new FormData();

            email.append('email', emailIn)
            console.log(email);

            csrf()
            await http.post('/api/register/email', email, { withCredentials: true })
                .then((res) => {
                    Swal.fire({
                        title: 'Thank You',
                        text: 'We Will Let You Know As Soon As The Website Is Ready , Be Safe !',
                        icon: 'success',
                        confirmButtonColor: 'var(--primary-color)'
                    })
                    setEmail('');
                    setActiveModalSub(false);
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Error',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonColor: 'red'
                    })
                })
        }
    }

    return (
        <Profiler >

            {loading ? Loading : ''}

            <div id="luxy" className='notification-container'>
                <div className={`notifcation ${activeModalSub ? 'active' : ''}`}  >
                    <div className='container' >
                        <div className='not-body'>
                            <IoMdClose className='close-button' onClick={ActiveSubModal} />
                            <h3>We Will Let You Know !</h3>
                            <p>Our Website Is Still Under Development Please Register Your Email
                                And We Will Contact You As Soon As The Website Is Ready</p>

                            <input type="email" placeholder='Email' name='email' id='email' onChange={e => setEmail(e.target.value)} />
                            <button onClick={e => handleEmail()}>LET ME KNOW</button>
                        </div>
                    </div>
                </div>

                <div id='maintanence'>
                    <div style={{ position: 'relative' }}>
                        <Navbar transparent={true} />
                    </div>

                    <div className='container-main' >

                        <div className="top-container">
                            <div className='left-cont'>
                                <h2>THIS WEBSITE IS STILL UNDER <br /> <span>DEVELOPMENT</span> <br />
                                    PLEASE ORDER YOUR WEBSITE <br /><span> MANUALLY USING ONE OF OUR <br /> SOCIAL MEDIA PLATFORMS</span>
                                </h2>
                                <button>
                                    <RiArrowGoBackFill /> BACK TO HOME PAGE
                                </button>

                                <button onClick={ActiveSubModal}>
                                    <AiOutlineBell /> NOTIFY ME
                                </button>
                            </div>

                            <img src={isDarkMode ? DesignersDark : Designers} alt="maintanence" />
                        </div>

                        <div className="bottom-container">
                            <img src={isDarkMode ? ClientDark : Client} alt="client" />
                            <img className='leftLayer' src={isDarkMode ? LeftLayerDark : LeftLayer} alt="leftLayer" />


                            <div className='right-cont'>
                                <div className='social-container'>
                                    <h2>FOLLOW US <RiUserFollowLine /></h2>

                                    <div className='social-media'>
                                        <Tooltip id='linkedin' />
                                        <a data-tooltip-id="linkedin" data-tooltip-content="LinkedIn" href='https://www.linkedin.com/company/webina-digital/'><img src={LinkedIn} alt="LinkedIn" /></a>
                                        <Tooltip id='facebook' />
                                        <a data-tooltip-id="facebook" data-tooltip-content="Facebook" href='https://www.facebook.com/webina-digital/'><img src={Facebook} alt="Facebook" /></a>
                                        <Tooltip id='instagram' />
                                        <a data-tooltip-id="instagram" data-tooltip-content="Instagram" href='https://www.isntagram.com/_webina/'><img src={Instagram} alt="Instagram" /></a>
                                        <Tooltip id='tiktok' />
                                        <a data-tooltip-id="tiktok" data-tooltip-content="TikTok" href='https://www.tiktok.com/webina-digital/'><img src={TikTok} alt="TikTok" /></a>
                                    </div>

                                    <h2>CONTACT US <BiPhone /></h2>

                                    <div className='social-media'>
                                        <Tooltip id='whatsapp' />
                                        <a data-tooltip-id="whatsapp" data-tooltip-content="Whatsapp" href='https://wa.link/mtxx2c'><img src={Whatsapp} alt="Whatsapp" /></a>
                                        <Tooltip id='email' />
                                        <a data-tooltip-id="email" data-tooltip-content="E-Mail" href='mailto:webinadigital@proton.me'><img src={Email} alt="Email" /></a>
                                        <Tooltip id='phone' />
                                        <a data-tooltip-id="phone" data-tooltip-content="Phone" href='tel:+212620792331'><img src={Phone} alt="Phone" /></a>
                                    </div>


                                </div>
                                <img className='right-layer' src={isDarkMode ? RightLayerDark : RightLayer} alt="right-layer" />


                            </div>


                        </div>

                    </div>
                    <h2 className='thank'>THANK YOU FOR VISITNG <br /><span>WEBINA DIGITAL</span></h2>
                    <Footer />
                </div>
            </div>
        </Profiler>
    )
}

export default Maintanence