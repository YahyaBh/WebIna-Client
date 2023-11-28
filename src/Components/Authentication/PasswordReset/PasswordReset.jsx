import React, { useContext, useEffect, useState } from 'react'
import './PasswordReset.scss'

import AuthContext from '../../../Context/AuthContext'
import { ThemeContext } from '../../../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import LogoDark from '../../../Assets/Home/Navbar/WEBINA-Logo.png'
import Logo from '../../../Assets/Home/Navbar/WEBINA2.png'
import ResetPassword from '../../../Assets/ResetPassword/Reset password-amico.svg'
import { MdLanguage } from 'react-icons/md'
import { FaSun, FaMoon } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Swal from 'sweetalert2'
import i18next from 'i18next'
import { Helmet } from 'react-helmet-async'
import Loading from '../../Loading/Loading'

const Login = () => {

    const [loginLoading, setLoginLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const [loading, setLoading] = useState(true);

    const { http, csrf, isAuthenticated } = AuthContext()
    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [])



    const handleLogin = async (e) => {
        e.preventDefault()
        csrf();

        if (email !== '') {

            setLoginLoading(true)

            const userData = new FormData();

            userData.append('email', email)

            await http.post('/api/forget-password', userData)
                .then((res) => {
                    setSent(true);
                })
                .catch((err) => {
                    setLoginLoading(false)

                    if (err?.response?.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops! Something went wrong',
                            text: "This email address doesn't exists.",
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
        setLoginLoading(false);

    }


    return (loading ? <Loading /> :
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Password Reset</title>
            </Helmet>

            <div id='password-reset' className={isDarkMode ? 'dark-in' : ''}>


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

                        <h2>IT'S OKAY</h2>

                        <p>Reset your password in seconds , securly</p>

                        <form onSubmit={handleLogin} autoComplete="off">

                            <div className="input-container">
                                <label htmlFor="email">{i18next.t("Email")}</label>
                                <input type="email" name='email' autoComplete='off' placeholder='email@example.com' onChange={e => setEmail(e.target.value)} />
                            </div>


                            <button type='submit'>{loginLoading ? <AiOutlineLoading3Quarters className="spin-load" /> : i18next.t("RESET_PASS")}</button>



                        </form>

                    </div>

                    <div className="right-container">
                        <img src={ResetPassword} alt="Sign In Graphique" />
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