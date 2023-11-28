import React, { Profiler } from 'react'

import './Cart.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import AsideStore from '../Layout/Aside/AsideStore'
import { BiCart, BiPackage, BiWallet } from 'react-icons/bi'
import { useStoreContext } from '../../Context/StoreConetxt'
import { BsStarFill } from 'react-icons/bs'




import Paypal from '../../Assets/Cart/paypal.png'
import MasterCard from '../../Assets/Cart/mastercard.png'
import Visa from '../../Assets/Cart/visa.png'
import Stripe from '../../Assets/Cart/stripe.png'

const Cart = () => {


    const { isAsideOpen } = useStoreContext();


    return (
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Cart</title>
                <meta name="description" content="Your shopping cart items" />
                <link rel='canonical' content="/cart" />
            </Helmet>


            <Profiler>

                <NavbarStore />


                <div id='cart' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="progress-bar">
                            <div className="shopping-cart">
                                <BiCart /> <h4 className='active'>Shopping Cart</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiWallet /> <h4>Checkout</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiPackage /> <h4>Order Dilevery</h4>
                            </div>
                        </div>

                        {/* <div className="back-button">
                            <BiLeftArrow /> Back
                        </div> */}


                        <div className="body-container">
                            <div className="cards-container">
                                <a href='/product/id' className="card">
                                    <img src="https://via.placeholder.com/300" alt="product" />

                                    <div className="card-body">
                                        <div className="left">
                                            <h3>Product Name</h3>
                                            <p><BiCart /> 27 Purchase</p>

                                            <div className="rating">
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                                <BsStarFill />
                                            </div>
                                        </div>

                                        <div className="right">
                                            <h3>39.00$</h3>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="info-container">

                                <div className="container-info">

                                    <div className="upper-info">
                                        <div className="sub">
                                            <h3>Subtotal</h3>

                                            <div className='products'>
                                                <div>
                                                    <p>Product Name</p>
                                                    <p>39.00$</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="discount">
                                            <h3>Discount</h3>


                                            <div className="content">
                                                <p>0%</p>
                                                <p>0.00$</p>
                                            </div>
                                        </div>

                                        <div className="extra-services">
                                            <h3>Other Services</h3>

                                            <div className='services'>
                                                <div>
                                                    <p>Deployment (x1)</p>
                                                    <p>10.00$</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="coupon-form">
                                        <input type="text" placeholder='Coupon Code' /> <button>Apply</button>
                                    </div>

                                    <hr className='main-line' />

                                    <p className='shipping'>Get <span>instant</span> shipping and free returns</p>

                                    <a href='/store' className='continue-shopping'>Continue Shopping</a>


                                    <button className="checkout-btn">
                                        Checkout | 39.00$
                                    </button>


                                    <div className="secure-payment">

                                        <p>SECURE PAYMENTS BY</p>

                                        <div className="container">
                                            <img src={Visa} alt="visa" />
                                            <img src={MasterCard} alt="mastercard" />
                                            <img src={Paypal} alt="paypal" />
                                            <img src={Stripe} alt="stripe" />
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

export default Cart