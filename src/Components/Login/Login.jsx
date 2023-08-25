import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import AuthContext from '../../Context/AuthContext'
import { ThemeContext } from '../../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import LogoDark from '../../Assets/Home/Navbar/WEBINA-Logo.png'
import Logo from '../../Assets/Home/Navbar/WEBINA2.png'
import SignIn from '../../Assets/SignIn/SignInGraph.svg'
import { MdLanguage } from 'react-icons/md'
import { FaSun, FaMoon, FaGoogle, FaFacebook } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Swal from 'sweetalert2'
import i18next from 'i18next'
import { Helmet } from 'react-helmet-async'

const Login = () => {

    const [loginLoading, setLoginLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { http, csrf, setUser, setAccessToken, setRememberToken } = AuthContext()
    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {

    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        if (email !== '' || password !== '') {
            setLoginLoading(true)

            const userData = new FormData();

            userData.append('email', email)
            userData.append('password', password)

            csrf();
            await http.post('/api/login', userData)
                .then((res) => {
                    setAccessToken(res.data.token);
                    res.data.remember_token ? setRememberToken(res.data.token) : setRememberToken()
                    setUser(res.data.user);
                    navigate('/');
                    setLoginLoading(false)
                })
                .catch((err) => {
                    setLoginLoading(false)

                    if (err.response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops! Something went wrong',
                            text: 'Email or password is incorrect',
                            customClass: {
                                container: 'popup-container',
                                popup: 'popup-popup',
                                header: 'popup-header',
                                title: 'popup-title',
                                closeButton: 'popup-close-button',
                                icon: 'popup-icon',
                                image: 'popup-image',
                                htmlContainer: 'popup-html',
                                input: 'popup-input',
                                inputLabel: 'popup-input-label',
                                validationMessage: 'popup-validation-message',
                                actions: 'popup-actions',
                                confirmButton: 'popup-confirm-button',
                                denyButton: 'popup-deny-button',
                                cancelButton: 'popup-cancel-button',
                                loader: 'popup-loader',
                                footer: 'popup-footer',
                                timerProgressBar: 'popup-timer-progress-bar',
                            },
                            confirmButtonAriaLabel: 'Sign Up Instead ?',
                            cancelButtonAriaLabel: 'Try Again',
                        })
                            .then((res) => {
                                if (res.isConfirmed) {
                                    navigate('/register')
                                }
                            })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops! Something went wrong',
                            text: err.message,
                            customClass: {
                                container: 'popup-container',
                                popup: 'popup-popup',
                                header: 'popup-header',
                                title: 'popup-title',
                                closeButton: 'popup-close-button',
                                icon: 'popup-icon',
                                image: 'popup-image',
                                htmlContainer: 'popup-html',
                                input: 'popup-input',
                                inputLabel: 'popup-input-label',
                                validationMessage: 'popup-validation-message',
                                actions: 'popup-actions',
                                confirmButton: 'popup-confirm-button',
                                denyButton: 'popup-deny-button',
                                cancelButton: 'popup-cancel-button',
                                loader: 'popup-loader',
                                footer: 'popup-footer',
                                timerProgressBar: 'popup-timer-progress-bar',
                            },
                            confirmButtonAriaLabel: 'Sign Up Instead ?',
                            cancelButtonAriaLabel: 'Try Again',
                        })
                    }
                })
        }

    }


    return (
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Login</title>
                <meta name="description" content="Let's Get you Signed in to your Webina Digital Account" />
                <link rel='canonical' content="/login" />
            </Helmet>

            <div id='sign-in' className={isDarkMode ? 'dark-in' : ''}>


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

                <div className='container'>
                    <div className="left-container">

                        <h4> {i18next.t("DONT_HAVE_ACCOUNT")} <a href='/register'>{i18next.t("SIGNUP")}</a></h4>

                        <h2>{i18next.t("WELCOME_BACK")}</h2>

                        <p>{i18next.t("WE_GLAD")}</p>

                        <form onSubmit={handleLogin} autoComplete="off">

                            <div className="input-container">
                                <label htmlFor="email">{i18next.t("Email")}</label>
                                <input type="email" name='email' autoComplete='off' placeholder='email@example.com' onChange={e => setEmail(e.target.value)} />
                            </div>


                            <div className="input-container">
                                <label htmlFor="password">{i18next.t("Password")}</label>
                                <input type="password" name='password' autoComplete='off' onChange={e => setPassword(e.target.value)} />
                            </div>


                            <button type='submit'>{loginLoading ? <AiOutlineLoading3Quarters className="spin-load" /> : i18next.t("SIGNIN")}</button>


                            <div className="under-sign">
                                <div className='agree'>
                                    <input type="checkbox" name="remember" id="remember" />
                                    <label htmlFor="remember">{i18next.t("REMEMBER_ME")}</label>
                                </div>
                                <a href="/forget-password">{i18next.t("FORGOT_PASSWORD")}</a>
                            </div>
                        </form>

                        <div className='with-sign'>
                            <hr /> <h3>{i18next.t("OR_SIGN_IN_WITH")}</h3> <hr />
                        </div>


                        <div className="google-facebook">
                            <button><FaGoogle />Google</button>
                            <button><FaFacebook />Facebook</button>
                        </div>
                    </div>

                    <div className="right-container">
                        <img src={SignIn} alt="Sign In Graphique" />
                    </div>

                </div>

                <div className='footer'>
                    <h4><span>WEBINA DIGITAL LTD</span> © 2023 All Rights Reserved</h4>
                </div>




            </div>
        </>
    )
}

export default Login