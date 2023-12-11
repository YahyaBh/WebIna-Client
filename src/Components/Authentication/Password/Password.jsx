import React, { Profiler, useEffect, useState } from 'react'

import './Password.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../../Layout/Navbar/NavbarStore'
import AsideStore from '../../Layout/Aside/AsideStore'

import AuthUser from '../../../Context/AuthContext'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../../../Context/StoreConetxt'
import { BiExit, BiQuestionMark, BiUser, BiX } from 'react-icons/bi'
import { PiCarThin } from 'react-icons/pi'
import { BsHeart } from 'react-icons/bs'
import { CgCreditCard, CgPassword } from 'react-icons/cg'
import { TbReport } from 'react-icons/tb'
import Loading from '../../Loading/Loading'


import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Password = () => {

    const [loading, setLoading] = useState();
    const [phone, setPhone] = useState();


    const { isAsideOpen } = useStoreContext();
    const { user, setUser, sec_http } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (user) {
            // getUserData();
        } else {
            navigate('/login', { replace: true });
        }
    }, [])


    const getUserData = async () => {

        await sec_http.get('/user')
            .then((res) => {
                setUser(res.data.user)
                setLoading(false)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err?.response?.data?.message
                })
            });
    }

    const updateUserInfo = async (e) => {
        e.preventDefault();
    }

    return (loading ? <Loading /> :
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Change Password</title>
                <meta name="description" content="Change Your Account Password Securly" />
                <link rel='canonical' content="/change-password" />
            </Helmet>


            <Profiler id='password-prof'>

                <NavbarStore />


                <div id='password' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="mid-container">

                            <div className="left-aside">
                                <ul>
                                    <li ><a href="/profile"><BiUser /> Profile</a></li>
                                    <li><a href="/purchases"><PiCarThin /> Purchases</a></li>
                                    <li><a href="/favourite"><BsHeart /> My Wishlist</a></li>
                                    <li><a href="/user/cards"><CgCreditCard /> My Cards</a></li>
                                    <li><a href="/reports"><TbReport /> My Reports</a></li>
                                    <li><a href="/user/questions"> <BiQuestionMark /> My Questions</a></li>
                                    <li className="active"><a href="#"><CgPassword /> Password</a></li>
                                    <li><a href="/logout"><BiExit /> Logout</a></li>
                                </ul>
                            </div>


                            <div className="right-container">

                                <h2>Change your password</h2>


                                <div className="infos">
                                    <div className="password-inp">
                                        <h4>Old Password</h4>
                                        <input type="text" name='old-password' id='old-password' placeholder='Old Password' />
                                    </div>

                                    <div className="password-inp">
                                        <h4>New Password</h4>
                                        <input type="password" name='new-password' id='new-password' placeholder='New Password' />
                                    </div>
                                </div>

                                <div className="infos">
                                    <div className="password-inp">
                                        <h4>Repeat New Password</h4>
                                        <input type="password" name='rep-new-password' id='rep-new-password' placeholder='Repeat New Password' autoComplete={false} />
                                    </div>

                                </div>


                                <button className='save-changes'>Save Changes</button>

                            </div>

                        </div>


                    </div>
                </div>

            </Profiler>

        </>
    )
}

export default Password