import React, { useContext, useEffect, useState } from 'react'
import './Login.scss'
import AuthContext from '../../../../Context/AuthContext'
import { ThemeContext } from '../../../../Context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import LogoDark from '../../../../Assets/Home/Navbar/WEBINA-Logo.png'
import Logo from '../../../../Assets/Home/Navbar/WEBINA2.png'
import SignIn from '../../../../Assets/SignIn/SignInGraph.svg'
import { MdLanguage } from 'react-icons/md'
import { FaSun, FaMoon, FaGoogle, FaFacebook } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Swal from 'sweetalert2'

const Login = () => {

    const [loginLoading, setLoginLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { http, csrf, setUser, setAccessToken, setRememberToken, rememberToken } = AuthContext()
    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (!rememberToken) {
            http.post('/api/remember')
                .then((res) => {
                    setAccessToken(res.data.token);
                    res.data.remember_token ? setRememberToken(res.data.token) : setRememberToken()
                    setUser(res.data.user);
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                })

        } else {
            return;
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        csrf();
        if (email !== '' || password !== '') {
            setLoginLoading(true)

            const userData = new FormData();

            userData.append('email', email)
            userData.append('password', password)

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
                        }
                    })
                })
        }

    }


    return (
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

                    <h4>Don't Have an account ?  <a href='/register'>Sign Up</a></h4>

                    <h2>Welcome  Back!</h2>

                    <p>We are glad to have you back , you can sign in right bellow</p>

                    <form onSubmit={handleLogin} autoComplete="off">

                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' autoComplete='off' placeholder='email@example.com' onChange={e => setEmail(e.target.value)} />
                        </div>


                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' autoComplete='off' onChange={e => setPassword(e.target.value)} />
                        </div>


                        <button type='submit'>{loginLoading ? <AiOutlineLoading3Quarters className="spin-load" /> : 'Sign In'}</button>


                        <div className="under-sign">
                            <div className='agree'>
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/forget-password">Forgot Password ?</a>
                        </div>
                    </form>

                    <div className='with-sign'>
                        <hr /> <h3>Or Sign In With</h3> <hr />
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
    )
}

export default Login