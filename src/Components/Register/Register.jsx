import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Register.scss'
import AuthContext from '../../Context/AuthContext'
import Cookies from 'js-cookie';
import { MdLanguage } from 'react-icons/md';
import { FaFacebook, FaGoogle, FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ThemeContext } from '../../Context/ThemeContext';
import LogoDark from '../../Assets/Home/Navbar/WEBINA-Logo.png'
import Logo from '../../Assets/Home/Navbar/WEBINA2.png'
import SignUp from '../../Assets/SignUp/SignUpGraph.svg'
import EmailVerf from '../../Assets/SignUp/Confirmed-cuate.svg'
import Swal from 'sweetalert2';
import i18next from 'i18next';
import { Helmet } from 'react-helmet-async';
import AVATAR1 from '../../Assets/SignUp/Avatars/avatar1.png'
import AVATAR2 from '../../Assets/SignUp/Avatars/avatar2.png'
import AVATAR3 from '../../Assets/SignUp/Avatars/avatar3.png'
import AVATAR4 from '../../Assets/SignUp/Avatars/avatar4.png'
import AVATAR5 from '../../Assets/SignUp/Avatars/avatar5.png'
import AVATAR6 from '../../Assets/SignUp/Avatars/avatar6.png'
import AVATAR7 from '../../Assets/SignUp/Avatars/avatar7.png'
import AVATAR8 from '../../Assets/SignUp/Avatars/avatar8.png'
import AVATAR9 from '../../Assets/SignUp/Avatars/avatar9.png'
import AVATAR10 from '../../Assets/SignUp/Avatars/avatar10.png'
import errorIcon from '../../Assets/Icons/wired-outline-1140-error.gif'


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState('');
    const [terms, setTerms] = useState(false);

    const [registerLoad, setRegisterLoad] = useState(false);

    const [emailVerification, setEmailVerification] = useState(false);

    const [ImageStep, SetImageStep] = useState(false);

    const { http, csrf, setAccessToken, setUser } = AuthContext()
    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    const handleRegisteration = async (e) => {

        e.preventDefault();

        setRegisterLoad(true);
        if (name !== '' && email !== '' && password !== '' && confirmPassword !== '' && Image !== '' && terms !== false) {
            if (password === confirmPassword) {
                if (name.split(' ').length === 2) {
                    if (terms === true) {
                        csrf();
                        const userData = new FormData();

                        userData.append('name', name)
                        userData.append('email', email)
                        userData.append('password', password)
                        userData.append('password_confirmation', confirmPassword)
                        userData.append('avatar', image)




                        await http.post('/api/register', userData, { withCredentials: true })
                            .then(() => {
                                setEmailVerification(true);
                                SetImageStep(false);
                            })
                            .catch((err) => {
                                errorHandler('Oops...!', err?.response?.data?.errors?.email?.map(message => message), 'Cancel', 'Sign In');
                            })

                    } else {
                        errorHandler('Terms and conditions required', 'To sign up, you must agree to our terms and conditions')
                    }
                } else {
                    errorHandler('Full name required', 'Please enter your full name')
                }
            } else {
                errorHandler('Password confirmation required', 'Your password does not match your password confirmation')
            }

        } else {
            errorHandler('All fields required', 'Please fill up all fields')
        }

        setRegisterLoad(false);
        SetImageStep(false);
    }


    const handleCheckVerification = async () => {

        csrf();
        const userData = new FormData();

        userData.append('email', email)
        userData.append('password', password)


        await http.post('/api/register/check-verification', userData, { withCredentials: true })
            .then((res) => {
                navigate('/store/home');
                setAccessToken(res.data.token);
                setUser(res.data.user);
                setEmailVerification(false);
                Cookies.set('__F_ACCESS', true);
            })
            .catch((err) => {
                errorHandler('Oops...!', err.response.data.errors.email ? err?.response?.data?.errors?.email?.map(message => message) : err?.response.data.message);
            })

        setRegisterLoad(false);

    }

    const handleAvatar = () => {
        if (!ImageStep) {
            if (name.split(' ').length === 2) {
                if (email !== '') {
                    if (password !== '') {
                        if (terms === true) {
                            if (confirmPassword === password) {
                                SetImageStep(true)
                            } else {
                                errorHandler('Password confirmation required', 'Your password does not match your password confirmation')
                            }
                        } else {
                            errorHandler('Terms and conditions required', 'To sign up, you must agree to our terms and conditions')
                        }
                    } else {
                        errorHandler('Password required', 'Please enter a valid password')
                    }
                } else {
                    errorHandler('Email addres required', 'Please enter your email address')
                }
            } else {
                errorHandler('Full name required', 'Please enter your full name')
            }

        } else {
            SetImageStep(false)
        }
    }

    const handleImageSetting = (e) => {
        if (e === image) {
            setImage('');
        } else {
            setImage(e)
        }
    }

    const errorHandler = (title, text, cancelText, confirmText) => {
        Swal.fire({
            title: title,
            imageUrl: errorIcon,
            imageHeight: 200, // Removed 'px' unit
            imageWidth: 200,  // Removed 'px' unit
            text: text,
            confirmButtonColor: '#1e1e1e',
            showCancelButton: cancelText ? true : false,
            cancelButtonText: cancelText ? cancelText : 'Cancel', // Provide a default value for cancelButtonText
            cancelButtonColor: '#dddd',
            confirmButtonText: confirmText ? confirmText : 'OK',
        })
            .then((result) => {
                if (result.isConfirmed && cancelText) {
                    // Assuming 'navigate' is a function that navigates to a different page
                    navigate('/login'); // Make sure the navigate function is defined and imported

                    // Handle confirmation case here
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // Handle cancelation case here
                    return null;
                }
                // You don't need to return false here
            });

    }


    const termsHandler = () => {
        setTerms(!terms);
    };

    return (
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Sign up</title>
                <meta name="description" content="Create an account on Webina Digital for free" />
                <link rel='canonical' content="/register" />
            </Helmet>

            <div id='sign-up' className={isDarkMode ? 'dark-up' : ''}>


                {emailVerification ?
                    <div className="email_verification_container">
                        <div className="card">
                            <div className="top">
                                <img src={EmailVerf} alt="sign-up-email" />
                                <h2>{i18next.t("EMAIL_VERIFICATION")}</h2>
                                <p>{i18next.t("EMAIL_VERIFICATION_PAG")}</p>
                            </div>

                            <button onClick={handleCheckVerification}>{i18next.t("EMAIL_VERIFICATION_BUTTON")}</button>
                            <button onClick={e => setEmailVerification(false)}>{i18next.t("EMAIL_VERIFICATION_CANCEL_BUTTON")}</button>
                        </div>
                    </div>
                    : ''}



                <div className='header'>
                    <div className="container">

                        <a href="/">
                            <img src={isDarkMode ? LogoDark : Logo} alt="logo" />
                        </a>


                        <div className='lang-mode'>
                            {isDarkMode ? <FaSun onClick={toggleTheme} /> : <FaMoon onClick={toggleTheme} />}
                            <MdLanguage />
                        </div>
                    </div>
                </div>

                {ImageStep ?
                    <div className='container'>
                        <div className='images-chose-container'>

                            <div className='container'>
                                <img src={AVATAR1} alt="avatar1" className={image === 'avatar1' ? 'active' : ''} onClick={e => handleImageSetting('avatar1')} />
                                <img src={AVATAR2} alt="avatar2" className={image === 'avatar2' ? 'active' : ''} onClick={e => handleImageSetting('avatar2')} />
                                <img src={AVATAR3} alt="avatar3" className={image === 'avatar3' ? 'active' : ''} onClick={e => handleImageSetting('avatar3')} />
                                <img src={AVATAR4} alt="avatar4" className={image === 'avatar4' ? 'active' : ''} onClick={e => handleImageSetting('avatar4')} />
                                <img src={AVATAR5} alt="avatar5" className={image === 'avatar5' ? 'active' : ''} onClick={e => handleImageSetting('avatar5')} />
                            </div>


                            <div className='container'>
                                <img src={AVATAR6} alt="avatar6" className={image === 'avatar6' ? 'active' : ''} onClick={e => handleImageSetting('avatar6')} />
                                <img src={AVATAR7} alt="avatar7" className={image === 'avatar7' ? 'active' : ''} onClick={e => handleImageSetting('avatar7')} />
                                <img src={AVATAR8} alt="avatar8" className={image === 'avatar8' ? 'active' : ''} onClick={e => handleImageSetting('avatar8')} />
                                <img src={AVATAR9} alt="avatar9" className={image === 'avatar9' ? 'active' : ''} onClick={e => handleImageSetting('avatar9')} />
                                <img src={AVATAR10} alt="avatar10" className={image === 'avatar10' ? 'active' : ''} onClick={e => handleImageSetting('avatar10')} />
                            </div>

                            <button className='finish' onClick={image ? handleRegisteration : ''} disabled={image ? false : true}>FINISH SIGNING UP</button>

                            <button className='back' onClick={handleAvatar}>GO BACK</button>

                        </div>
                    </div>
                    :
                    <div className='container'>
                        <div className="left-container">

                            <h4>{i18next.t("HAVE_AN_ACCOUNT")} <a href='/login'> {i18next.t("SIGNIN")}</a></h4>

                            <h2>{i18next.t("WELCOME")}</h2>

                            <p>{i18next.t("FIRST_THINGS")}</p>

                            <form onSubmit={e => e.preventDefault()} autoComplete={"off"}>



                                <div className="input-container">
                                    <label htmlFor="name">{i18next.t("Name")}</label>
                                    <input type="text" name='name' placeholder='Jhon Smith' value={name} onChange={e => setName(e.target.value)} autoComplete="off" />
                                </div>


                                <div className="input-container">
                                    <label htmlFor="email">{i18next.t("Email")}</label>
                                    <input type="email" name='email' placeholder='email@example.com' value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" />
                                </div>


                                <div className="input-container">
                                    <label htmlFor="password">{i18next.t("Password")}</label>
                                    <input type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
                                </div>

                                <div className="input-container">
                                    <label htmlFor="conf_password">{i18next.t("Confirm_Password")}</label>
                                    <input type="password" name='conf_password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="off" />
                                </div>

                                <label htmlFor="terms&privacy" class="control control-checkbox">
                                    <a href="/terms&conditions">{i18next.t("TERMS_PRIVACY")}</a>
                                    <input checked={terms} onChange={termsHandler} type="checkbox" name="terms&privacy" id="terms&privacy" />
                                    <div class="control_indicator"></div>
                                </label>

                                <button onClick={handleAvatar}>{registerLoad ? <AiOutlineLoading3Quarters className="spin-load" /> : i18next.t("SIGNUP")}</button>

                            </form>

                            <div className='with-sign'>
                                <hr /> <h3>{i18next.t("OR_SIGN_UP_WITH")}</h3> <hr />
                            </div>


                            <div className="google-facebook">
                                <button><FaGoogle />Google</button>
                                <button><FaFacebook />Facebook</button>
                            </div>
                        </div>

                        <div className="right-container">
                            <img src={SignUp} alt="Sign In Graphique" />
                        </div>

                    </div>
                }

                <div className='footer'>
                    <h4><span>WEBINA DIGITAL LTD</span> © 2023 All Rights Reserved</h4>
                </div>


            </div>

        </>
    )
}

export default Register