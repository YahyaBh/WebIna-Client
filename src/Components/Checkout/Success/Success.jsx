import React, { Profiler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../../Loading/Loading'

import './Success.scss'

import { Helmet } from 'react-helmet-async'

import { RiVerifiedBadgeFill } from "react-icons/ri";

import AuthUser from '../../../Context/AuthContext'
import Cookies from 'js-cookie'
import NavbarStore from '../../Layout/Navbar/NavbarStore'


const Success = () => {

    const [loading, setLoading] = useState(false);



    const { isAuthenticated } = AuthUser();


    const navigate = useNavigate();







    useEffect(() => {

        if (isAuthenticated) {
            if (Cookies.get('__PAYMENT') === 'success') {
                setLoading(false);
                Cookies.remove('__PAYMENT');
            } else if (Cookies.get('__PAYMENT') === 'failed') {
                navigate('/order/failed', { replace: true })
            } else {
                navigate('/', { replace: true })
            }
        } else {
            navigate('/login', { replace: true })
        }


    }, []);



    return (loading ? <Loading /> :
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Successful Payment</title>
                <meta name="description" content="Your payment was successful" />
                <link rel='canonical' content="/payment/success" />
            </Helmet>


            <NavbarStore />


            <Profiler id="success-payment">

                <div className="checkout-success">
                    <div className="container">

                        <RiVerifiedBadgeFill />

                        <h1>Your order is confirmed</h1>

                        <p>Thank you for your order , we're processing it right now , please wait until one of our customer service agents contact you for further details about the product configruation.</p>


                        <div className="buttons">
                            <button onClick={() => navigate('/')}>Home</button>

                            <button onClick={() => navigate('/purchases')}>Orders</button>
                        </div>
                    </div>
                </div>
            </Profiler>
        </>
    )
}

export default Success