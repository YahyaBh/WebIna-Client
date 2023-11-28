import React, { useLayoutEffect } from 'react'
import AuthContext from '../../Context/AuthContext'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Welcome.scss'
import { IoStorefront } from 'react-icons/io5'
import { BiCamera, BiHotel } from 'react-icons/bi'
import { MdOutlineCameraRear, MdSportsGymnastics } from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'

const Welcome = () => {

    const navigate = useNavigate()
    const { user } = AuthContext()

    useLayoutEffect(() => {
        // if (Cookies.get('__F_ACCESS')) {
        //     Cookies.remove('__F_ACCESS');
        // } else {
        //     navigate('/');
        // }
    }, []);

    return (
        <>
            <Helmet>
                <title>WEBINA DIGITAL | Welcome</title>
                <meta name="description" content="Welcome to Webina Digital" />
            </Helmet>



            <div className="welcome-container">

                <h2>Welcome {user.name.split(' ')[0]} !</h2>

                <h3>What type of business you have ?</h3>

                <div className="business-types">

                    <div className="business-type" onClick={() => navigate("/store/e-commerce")}>
                        <IoStorefront />
                        <p>Online Store</p>
                    </div>

                    <div className="business-type" onClick={() => navigate("/store/retail")}>
                        <BiHotel />
                        <p>Hotel or Retail</p>
                    </div>

                    <div className="business-type" onClick={() => navigate("/store/retail")}>
                        <MdSportsGymnastics />
                        <p>Gym</p>
                    </div>

                    <div className="business-type" onClick={() => navigate("/store/retail")}>
                        <BiCamera />
                        <p>Photographer</p>
                    </div>

                    <div className="business-type" onClick={() => navigate("/store/retail")}>
                        <BsPerson />
                        <p>Personal</p>
                    </div>

                </div>

                <button>Other business</button>

            </div>

        </>

    )
}

export default Welcome