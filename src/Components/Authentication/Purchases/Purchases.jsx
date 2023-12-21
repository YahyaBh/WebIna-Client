import React, { Profiler, useEffect, useState } from 'react'

import './Purchases.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../../Layout/Navbar/NavbarStore'
import AsideStore from '../../Layout/Aside/AsideStore'

import AuthUser from '../../../Context/AuthContext'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../../../Context/StoreConetxt'
import { BiDotsHorizontalRounded, BiDownload, BiExit, BiQuestionMark, BiUser } from 'react-icons/bi'
import { PiCarThin } from 'react-icons/pi'
import { BsHeart } from 'react-icons/bs'
import { CgCreditCard, CgPassword } from 'react-icons/cg'
import { TbReport } from 'react-icons/tb'
import Loading from '../../Loading/Loading'


import { MdReviews } from 'react-icons/md'

const Profile = () => {

    const [loading, setLoading] = useState();
    const [products, setProducts] = useState([]);

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
        await sec_http.post('/api/user/purchased')
            .then((res) => {
                setProducts(res.data.products)
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
                <title>WEBINA DIGITAL | Purchases</title>
                <meta name="description" content="Your pervious purchases on Webina Digital" />
                <link rel='canonical' content="/purchases" />
            </Helmet>


            <Profiler id='purchases-prof'>

                <NavbarStore />


                <div id='purchases' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="mid-container">

                            <div className="left-aside">
                                <ul>
                                    <li ><a href="/profile"><BiUser /> Profile</a></li>
                                    <li className="active"><a href="/purchases"><PiCarThin /> Purchases</a></li>
                                    <li><a href="/favourite"><BsHeart /> My Wishlist</a></li>
                                    <li><a href="/user/cards"><CgCreditCard /> My Cards</a></li>
                                    <li><a href="/reports"><TbReport /> My Reports</a></li>
                                    <li><a href="/user/questions"> <BiQuestionMark /> My Questions</a></li>
                                    <li><a href="/change-password"><CgPassword /> Password</a></li>
                                    <li><a href="/logout"><BiExit /> Logout</a></li>
                                </ul>
                            </div>


                            <div className="right-container">

                                <h2>My Purchase List ({products.length})</h2>




                                <div className="cards">
                                    {products.length > 0 ? products.map((product, index) => (
                                        <div className="card" key={index}>
                                            <div className="left">
                                                <img src={product.image1} alt={"pic-card-purchase " + index} />
                                            </div>

                                            <div className="right">
                                                <div className="text">
                                                    <div className="left-cont">
                                                        <h5>Purchased on {new Date(product.created_at).toLocaleDateString()}</h5>
                                                        <h3>{product.name}</h3>
                                                    </div>

                                                    <div className="right-cont">
                                                        <p>Proccessing order</p>
                                                    </div>
                                                </div>

                                                <div className="bottom">
                                                    <div className="prev">
                                                        <a href={`/product/${product.token}`}>Preview</a>
                                                    </div>

                                                    <div className="actions">
                                                        <button><BiDownload /> Download</button>
                                                        <button><MdReviews /> Review</button>
                                                        <button><BiDotsHorizontalRounded /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) :


                                        <div className="empty">

                                            <h3>No Purchases Yet</h3>
                                            <a href="/">Shop Now</a>

                                        </div>
                                    }
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