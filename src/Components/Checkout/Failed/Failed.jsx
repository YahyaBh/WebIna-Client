import React, { Profiler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../../Loading/Loading'

import './Failed.scss'

import { Helmet } from 'react-helmet-async'

import { MdErrorOutline } from "react-icons/md";
import AuthUser from '../../../Context/AuthContext'
import Cookies from 'js-cookie'
import NavbarStore from '../../Layout/Navbar/NavbarStore'


const Failed = () => {

    const [loading, setLoading] = useState(false);



    const { isAuthenticated } = AuthUser();


    const navigate = useNavigate();







    useEffect(() => {

        if(isAuthenticated) {
            if (Cookies.get('__PAYMENT') === 'failed') {
                setLoading(false);
                Cookies.remove('__PAYMENT');
            } else if (Cookies.get('__PAYMENT') === 'success') {
                navigate('/order/success', { replace: true })
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
                <title>WEBINA DIGITAL | Failed Payment</title>
                <meta name="description" content="Your payment was unsuccessful" />
                <link rel='canonical' content="/payment/failed" />
            </Helmet>


            <NavbarStore />


            <Profiler id="failed-payment">

                <div className="checkout-failed">
                    <div className="container">

                        <MdErrorOutline />

                        <h1>Something went wrong !</h1>

                        <p>Sorry to let you know , but something went wrong with your payment , try using another card or try other payment methods.</p>


                        <div className="buttons">
                            <button onClick={() => navigate('/')}>Home</button>

                            <button onClick={() => navigate(-1)}>GO BACK</button>
                        </div>

                        <a href="/contact">Contact support?</a>
                    </div>
                </div>
            </Profiler>
        </>
    )
}

export default Failed