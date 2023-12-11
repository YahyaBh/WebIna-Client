import React, { Profiler, useEffect, useState } from 'react'

import './Wishlist.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../../Layout/Navbar/NavbarStore'
import AsideStore from '../../Layout/Aside/AsideStore'

import AuthUser from '../../../Context/AuthContext'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../../../Context/StoreConetxt'
import { BiCartAdd, BiDotsHorizontalRounded, BiDownload, BiExit, BiHeart, BiQuestionMark, BiUser } from 'react-icons/bi'
import { PiCarThin } from 'react-icons/pi'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { CgCreditCard, CgPassword } from 'react-icons/cg'
import { TbReport } from 'react-icons/tb'
import Loading from '../../Loading/Loading'


import { MdReviews } from 'react-icons/md'

const Profile = () => {

    const [loading, setLoading] = useState();


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



    return (loading ? <Loading /> :
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Wishlist</title>
                <meta name="description" content="Your dream digital applications" />
                <link rel='canonical' content="/favourite" />
            </Helmet>


            <Profiler id='wishlist-prof'>

                <NavbarStore />


                <div id='wishlist' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="mid-container">

                            <div className="left-aside">
                                <ul>
                                    <li ><a href="/profile"><BiUser /> Profile</a></li>
                                    <li ><a href="/purchases"><PiCarThin /> Purchases</a></li>
                                    <li className="active"><a href="#"><BsHeart /> My Wishlist</a></li>
                                    <li><a href="/user/cards"><CgCreditCard /> My Cards</a></li>
                                    <li><a href="/reports"><TbReport /> My Reports</a></li>
                                    <li><a href="/user/questions"> <BiQuestionMark /> My Questions</a></li>
                                    <li><a href="/change-password"><CgPassword /> Password</a></li>
                                    <li><a href="/logout"><BiExit /> Logout</a></li>
                                </ul>
                            </div>


                            <div className="right-container">

                                <h2>My Purchase List (10)</h2>




                                <div className="cards">
                                    <div className="card">
                                        <div className="left">
                                            <img src="https://placehold.co/300" alt="pic-card-purchase" />
                                        </div>

                                        <div className="right">
                                            <div className="text">
                                                <h5>Added on Nov 17, 2023</h5>
                                                <h3>Temprador WooCommerce Landing Page Theme</h3>
                                            </div>

                                            <div className="bottom">
                                                <div className="prev">
                                                    <h3>33.00$</h3>
                                                    <h4><sub>50.00$</sub></h4>
                                                </div>

                                                <div className="actions">
                                                    <button><BiCartAdd/> Add To Cart</button>
                                                    <button><BsHeartFill /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                            </div>

                        </div>


                    </div>
                </div>

            </Profiler>

        </>
    )
}

export default Profile