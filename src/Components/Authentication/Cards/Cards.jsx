import React, { Profiler, useEffect, useState } from 'react'

import './Cards.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../../Layout/Navbar/NavbarStore'
import AsideStore from '../../Layout/Aside/AsideStore'

import AuthUser from '../../../Context/AuthContext'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../../../Context/StoreConetxt'
import { BiCreditCard, BiExit, BiPlus, BiQuestionMark, BiUser, BiX } from 'react-icons/bi';
import { RiVisaFill } from "react-icons/ri";
import { RiMastercardLine } from "react-icons/ri";
import { PiCarThin } from 'react-icons/pi'
import { BsHeart } from 'react-icons/bs'
import { CgCreditCard, CgPassword } from 'react-icons/cg'
import { TbReport } from 'react-icons/tb'
import Loading from '../../Loading/Loading'
import { FaCcDiscover } from 'react-icons/fa'



const Profile = () => {

    const [loading, setLoading] = useState();
    const [cards, setCards] = useState([]);

    const { isAsideOpen } = useStoreContext();
    const { isAuthenticated, sec_http } = AuthUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated) {
            getUserData();
        } else {
            navigate('/login', { replace: true });
        }
    }, [])


    const getUserData = async () => {

        await sec_http.post('/api/user/cards')
            .then((res) => {
                setCards(res.data.cards)
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
                <title>WEBINA DIGITAL | My Cards</title>
                <meta name="description" content="Your payment cards used on Webina Digital" />
                <link rel='canonical' content="/user/cards" />
            </Helmet>


            <Profiler id='cards-prof'>

                <NavbarStore />


                <div id='cards' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="mid-container">

                            <div className="left-aside">
                                <ul>
                                    <li ><a href="/profile"><BiUser /> Profile</a></li>
                                    <li ><a href="/purchases"><PiCarThin /> Purchases</a></li>
                                    <li><a href="/favourite"><BsHeart /> My Wishlist</a></li>
                                    <li className="active"><a href='#'><CgCreditCard /> My Cards</a></li>
                                    <li><a href="/reports"><TbReport /> My Reports</a></li>
                                    <li><a href="/user/questions"> <BiQuestionMark /> My Questions</a></li>
                                    <li><a href="/change-password"><CgPassword /> Password</a></li>
                                    <li><a href="/logout"><BiExit /> Logout</a></li>
                                </ul>
                            </div>


                            <div className="right-container">

                                <div className="topper">
                                    <h2>My Cards</h2>
                                    <button><BiPlus /> Add Card</button>
                                </div>


                                <div className="table">

                                    <div className="top">
                                        <h3>Card Brand</h3>
                                        <h3>Card Number</h3>
                                        <h3>Expiration Date</h3>
                                        <h3>Remove</h3>
                                    </div>


                                    <div className="body">
                                        {cards?.length > 0 ? cards?.map((card, index) => (
                                            <div className="card" key={index}>
                                                <h3 className='card-brand'>{card.card_type}{card.card_type === 'mastercard' ? <RiMastercardLine /> : card.card_type === 'visa' ?  <RiVisaFill /> : card.card_type === 'discover' ? <FaCcDiscover /> : <BiCreditCard />}</h3>
                                                <h3>******** {card.card_last_four}</h3>
                                                <h3>{card.exp_month}/{card.exp_year}</h3>
                                                <h3><BiX /></h3>
                                            </div>
                                        )) :

                                            <div className="empty">
                                                <h3>No Cards Added</h3>
                                            </div>
                                        }
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