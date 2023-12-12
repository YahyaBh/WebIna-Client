import React, { Profiler, useEffect, useState } from 'react'

import './Profile.scss'

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

const Profile = () => {

    const [loading, setLoading] = useState();


    const [avatar, setAvatar] = useState();
    const [avatarPrev, setAvatarPrev] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();


    const { isAsideOpen } = useStoreContext();
    const { user, setUser, sec_http } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (user) {
            getUserData();
        } else {
            navigate('/login', { replace: true });
        }
    }, [])


    const getUserData = async () => {
        await sec_http.post('/api/user')
            .then((res) => {
                setUser(res.data.user)

                res.data.user?.avatar ? setAvatarPrev(res.data.user?.avatar) : setAvatar(null);

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


        const userNewData = new FormData();

        if (avatar === null && name === user?.name && phone === user?.phone) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No changes were made'
            })
            return;
        } else {
            if (avatar) {
                userNewData.append('avatar', avatar)
                if (name) {
                    userNewData.append('name', name)
                    if (phone) {
                        userNewData.append('phone', phone)


                        await sec_http.post('/api/user/update', userNewData)
                            .then((res) => {
                                getUserData();
                            })
                            .catch((err) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: err?.response?.data?.message
                                })
                            })
                    }
                }
            }
        }

    }


    const imageHandler = (e) => {

        const file = e.target.files[0];

        if (file) {
            setAvatar(file);
            setAvatarPrev(URL.createObjectURL(file));
        }
    }

    const imageRemove = () => {
        if (avatarPrev || avatar) {
            setAvatar(null);
            setAvatarPrev(null);
        }
    }

    return (loading ? <Loading /> :
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Profile</title>
                <meta name="description" content="Your personal profile configuration" />
                <link rel='canonical' content="/profile" />
            </Helmet>


            <Profiler id='profile-prof'>

                <NavbarStore />


                <div id='profile' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="mid-container">

                            <div className="left-aside">
                                <ul>
                                    <li className="active"><a href="/profile"><BiUser /> Profile</a></li>
                                    <li><a href="/purchases"><PiCarThin /> Purchases</a></li>
                                    <li><a href="/favourite"><BsHeart /> My Wishlist</a></li>
                                    <li><a href="/user/cards"><CgCreditCard /> My Cards</a></li>
                                    <li><a href="/reports"><TbReport /> My Reports</a></li>
                                    <li><a href="/user/questions"> <BiQuestionMark /> My Questions</a></li>
                                    <li><a href="/change-password"><CgPassword /> Password</a></li>
                                    <li><a href="/logout"><BiExit /> Logout</a></li>
                                </ul>
                            </div>


                            <div className="right-container">

                                <h2>Personal information</h2>

                                <h4>Avatar</h4>

                                <div className="avatar-container">

                                    <BiX className='delete-pic' title='delete picture' onClick={e => imageRemove()} />

                                    <label htmlFor="avatar" className='avatar'>

                                        <div className="image-container">
                                            <img src={avatarPrev} alt="avatar" />
                                            <input type="file" name="avatar" id="avatar" onChange={e => imageHandler(e)} />
                                            <h3>CHOOSE AN IMAGE</h3>
                                        </div>

                                    </label>
                                </div>

                                <div className="infos">
                                    <div className="full-name">
                                        <h4>Full Name</h4>
                                        <input type="text" name='full-name' id='full-name' defaultValue={user?.name} onChange={e => setName(e.target.value)} placeholder='Full Name' />
                                    </div>

                                    <div className="phone-number">
                                        <h4>Phone Number</h4>
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone}
                                            defaultCountry="MA"
                                            smartCaret={true}
                                            international={false}
                                            limitMaxLength={true}
                                            defaultValue={user?.phone}
                                        />
                                    </div>
                                </div>

                                <div className="infos">
                                    <div className="email">
                                        <h4>Email Address</h4>
                                        <input type="email" name='email' id='email' value={user?.email} disabled={true} />
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

export default Profile