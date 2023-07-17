import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Register.scss'
import AuthContext from '../../../../Context/AuthContext'
import Cookies from 'js-cookie';
import { MdLanguage } from 'react-icons/md';
import { FaFacebook, FaGoogle, FaMoon, FaSun } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ThemeContext } from '../../../../Context/ThemeContext';
import LogoDark from '../../../../Assets/Home/Navbar/WEBINA-Logo.png'
import Logo from '../../../../Assets/Home/Navbar/WEBINA2.png'
import SignUp from '../../../../Assets/SignUp/SignUpGraph.svg'
import Swal from 'sweetalert2';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const [registerLoad, setRegisterLoad] = useState(false);

    const { http, csrf, setAccessToken, setUser } = AuthContext()
    const navigate = useNavigate();

    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    const handleRegisteration = async (e) => {

        e.preventDefault();

        setRegisterLoad(true);
        if (name !== '' || email !== '' || password !== '' || confirmPassword !== '') {
            if (password === confirmPassword) {

                csrf();
                const userData = new FormData();

                userData.append('name', name)
                userData.append('email', email)
                userData.append('password', password)
                userData.append('password_confirmation', confirmPassword)



                await http.post('/api/register', userData, { withCredentials: true })
                    .then((res) => {
                        navigate('/welcome');
                        setAccessToken(res.data.token);
                        setUser(res.data.user);
                        Cookies.set('__F_ACCESS', true);
                        setRegisterLoad(false);
                    })
                    .catch((err) => {
                        Swal.fire('error', err.message)
                        setRegisterLoad(false);
                    })

            } else {
                setRegisterLoad(false);
                Swal.fire('error', 'Password does not match passowrd confirmation , please try again')
            }

        } else {
            setRegisterLoad(false);
            Swal.fire('error', 'No section can be empty')

        }
    }

    return (
        <div id='sign-up' className={isDarkMode ? 'dark-up' : ''}>


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

                    <h4>Have an account ? <a href='/login'> Sign In</a></h4>

                    <h2>Welcome !</h2>

                    <p>First things first you can Create an account</p>

                    <form onSubmit={handleRegisteration} autoComplete={"off"}>



                        <div className="input-container">
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' placeholder='Jhon Smith' onChange={e => setName(e.target.value)} autoComplete="off" />
                        </div>


                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='email@example.com' onChange={e => setEmail(e.target.value)} autoComplete="off" />
                        </div>


                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input type="text" name='password' onChange={e => setPassword(e.target.value)} autoComplete="off" />
                        </div>

                        <div className="input-container">
                            <label htmlFor="conf_password">Confirm Password</label>
                            <input type="text" name='conf_password' onChange={e => setConfirmPassword(e.target.value)} autoComplete="off" />
                        </div>

                        <button type='submit'>{registerLoad ? <AiOutlineLoading3Quarters className="spin-load" /> : 'Sign Up'}</button>


                        <div className="under-sign">
                            <div className='agree'>
                                <input type="checkbox" name="remember" id="remember" />
                                <label htmlFor="remember">Agree on terms & privacy</label>
                            </div>
                        </div>
                    </form>

                    <div className='with-sign'>
                        <hr /> <h3>Or Sign Up With</h3> <hr />
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

            <div className='footer'>
                <h4><span>WEBINA DIGITAL LTD</span> © 2023 All Rights Reserved</h4>
            </div>




        </div>
    )
}

export default Register