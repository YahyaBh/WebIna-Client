import React, { Profiler, useEffect, useState } from 'react'
import Paypal from './Paypal/Paypal'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'

const Checkout = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(false)

    }, [])

    return (loading ? <Loading /> :
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Cart</title>
                <meta name="description" content="Your shopping cart items" />
                <link rel='canonical' content="/cart" />
            </Helmet>


            <Profiler id='cart'>

                <NavbarStore isNotAside={true} />


                <div id='cart'>



                </div>
            </Profiler>



        </>

    )
}

export default Checkout