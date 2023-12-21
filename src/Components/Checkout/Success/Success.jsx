import React, { Profiler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../../Loading/Loading'

import { Helmet } from 'react-helmet-async'

import { RiVerifiedBadgeFill } from "react-icons/ri";

import AuthUser from '../../../Context/AuthContext'
import Cookies from 'js-cookie'


const Success = () => {

    const [loading, setLoading] = useState(true);



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
            navigate('/', { replace: true })
        }
    }, []);



    return (loading ? <Loading /> :
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Successful Payment</title>
                <meta name="description" content="Your payment was successful" />
                <link rel='canonical' content="/payment/success" />
            </Helmet>


            <Profiler id="success-payment">

                <div className="checkout-success">
                    <div className="container">

                        <RiVerifiedBadgeFill />

                        <h1>Your order is confirmed</h1>

                        <p>Thank you for your order , we're processing it right now , please wait until one of our customer service agents contact you for further details about the product configruation.</p>
                    </div>
                </div>
            </Profiler>
        </>
    )
}

export default Success