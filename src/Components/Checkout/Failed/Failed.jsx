import React, { Profiler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



import Loading from '../../Loading/Loading'

import { Helmet } from 'react-helmet-async'

import { BiXCircle } from "react-icons/bi";

import AuthUser from '../../../Context/AuthContext'
import Cookies from 'js-cookie'


const Success = () => {

    const [loading, setLoading] = useState(true);



    const { isAuthenticated } = AuthUser();


    const navigate = useNavigate();







    useEffect(() => {

        if (isAuthenticated) {


            if (Cookies.get('__PAYMENT') === 'failed') {
                setLoading(false);
                Cookies.remove('__PAYMENT');
            } else if (Cookies.get('__PAYMENT') === 'success') {
                navigate('/order/success', { replace: true })
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
                <title>WEBINA DIGITAL | Paiment Failed</title>
                <meta name="description" content="Your payment was successful" />
                <link rel='canonical' content="/payment/success" />
            </Helmet>


            <Profiler id="success-payment">

                <div className="checkout-success">
                    <div className="container">

                        <BiXCircle />

                        <h1>Your payment was unsecssful</h1>

                        <p>We're sorry for the inconvenience , but we're unable to process your payment at this time , try to use another card or other payment method</p>
                    </div>
                </div>
            </Profiler>
        </>
    )
}

export default Success