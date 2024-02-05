import React, { Profiler, useEffect, useState } from 'react'

import './Cart.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import AsideStore from '../Layout/Aside/AsideStore'
import Footer from '../Layout/Footer/Footer'

import { BiCart, BiPackage, BiWallet } from 'react-icons/bi'
import { useStoreContext } from '../../Context/StoreConetxt'
import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import {  CgShoppingCart } from "react-icons/cg";



import Paypal from '../../Assets/Cart/paypal.png'
import MasterCard from '../../Assets/Cart/mastercard.png'
import Visa from '../../Assets/Cart/visa.png'
import Stripe from '../../Assets/Cart/stripe.png'
import AuthUser from '../../Context/AuthContext'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Loading from '../Loading/Loading'

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [discountNumber, setDiscountNumber] = useState('');
    const [discountAvailable, setDiscountAvailable] = useState(401);

    const [subtotal, setSubtotal] = useState(0);

    const { isAsideOpen } = useStoreContext();

    const [loading, setLoading] = useState(true);

    const { sec_http, isAuthenticated, setCartCounter } = AuthUser();

    const navigate = useNavigate();


    function calculateTotalPrice() {
        // Assuming products have a "price" property
        const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

        // Applying a discount of 10%
        const dis = discount / 100; // 10%

        // Calculate discounted price
        const afterDiscountPrice = totalPrice - totalPrice * dis;

        return afterDiscountPrice;
    }


    useEffect(() => {

        if (isAuthenticated) {
            getCart();

        } else {
            navigate('/')
        }

    }, [])

    const getCart = () => {

        sec_http.get('/api/cart')
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })

    }


    const removeFromCart = (token) => {

        sec_http.post('/api/cart/remove/product', { product_token: token })
            .then((res) => {
                getCart();
                setCartCounter(res.data.cart_count);
            })
    }


    const discountGet = () => {


        if (discountNumber.length === 8) {
            sec_http.post('/api/cart/discount/check', { discount: discountNumber })
                .then((res) => {

                    if (res.data.status === false) {
                        setDiscountAvailable(404);
                    } else {
                        setDiscount(res.data.discount);
                        setDiscountAvailable(200);
                        setDiscountCheckout();
                    }
                })
                .catch((err) => {
                    return;
                })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid discount code',
            });
        }
    }

    const renderStars = (e) => {
        const maxRating = 5;
        const stars = [];

        for (let i = 0; i < maxRating; i++) {
            let starIcon;

            if (i < Math.floor(e)) {
                starIcon = <BsFillStarFill />;
            } else if (i === Math.floor(e) && !Number.isInteger(e)) {
                starIcon = <BsStarHalf />;
            } else {
                starIcon = <BsStar />;
            }

            stars.push(
                <div
                    key={i}
                    className={`star`}
                >
                    {starIcon}
                </div>
            );
        }

        return stars;
    };


    const setDiscountCheckout = (e) => {


        if (discount && discountAvailable === 200) {
            Cookies.set('discount', discount, { expires: 1, secure: true, });
        } else {
            return;
        }

    }

    return (
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Cart</title>
                <meta name="description" content="Your shopping cart items" />
                <link rel='canonical' content="/cart" />
            </Helmet>

            {loading ? <Loading /> : ''}
            <Profiler>

                <NavbarStore />


                <div id='cart' className={isAsideOpen ? 'aside-open' : ''}>

                    <AsideStore />


                    <div className="container">

                        <div className="progress-bar">
                            <div className="shopping-cart">
                                <BiCart /> <h4 className='active'>Shopping</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiWallet /> <h4>Checkout</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiPackage /> <h4>Dilevery</h4>
                            </div>
                        </div>




                        <div className="body-container">
                            <div className="cards-container">

                                {products ? products.map((product, index) =>
                                    <div key={index} className="card">
                                        <a href={`/store/product/${product.token}`}>
                                            <img src={product.image1} alt={product.name} />

                                            <div className="card-body">
                                                <div className="left">
                                                    <h3>{product.name}</h3>
                                                    <p><BiCart /> {product.purchases} Purchase</p>

                                                    <div className="rating">
                                                        {renderStars(product?.rating > 0 ? product?.rating : 0)}
                                                    </div>
                                                </div>

                                                <div className="right">
                                                    <h3>{product.price}$</h3>
                                                </div>
                                            </div>
                                        </a>
                                        {/* <div className="delete" onClick={() => removeFromCart(product.token)}>
                                            Remove <CgRemove />
                                        </div> */}
                                    </div>
                                ) :

                                    <div className='empty-container'>

                                        <h2>Your Cart Is Empty</h2>

                                        <CgShoppingCart />

                                        <button onClick={() => navigate('/store')}>SHOP NOW</button>

                                    </div>

                                }

                            </div>

                            <div className="info-container">

                                <div className="container-info">

                                    <div className="upper-info">
                                        <div className="sub">
                                            <h3>Subtotal</h3>

                                            <div className='products'>
                                                {products.map((product, index) =>
                                                    <div key={index}>
                                                        <p>{product.name}</p>
                                                        <p>{product.price}$</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="discount">
                                            <h3>Discount</h3>


                                            <div className="content">
                                                <p>{discount}%</p>
                                                <p>{subtotal - (subtotal * (discount / 100))}$</p>
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
                                        <div><input type="text" placeholder='Coupon Code' onChange={e => setDiscountNumber(e.target.value)} value={discountNumber} /> <button onClick={discountGet}>Apply</button></div>
                                        {discountAvailable === 200 ? <p className='available'>Discount applied</p> : discountAvailable === 404 ? <p className='unavailable'>Discount not available</p> : ''}
                                    </div>

                                    <hr className='main-line' />

                                    <p className='shipping'>Get <span>instant</span> shipping and free returns</p>

                                    <a href='/store' className='continue-shopping'>Continue Shopping</a>


                                    {calculateTotalPrice() === 0 ? '' : <a href='/checkout' className="checkout-btn">
                                        Checkout | {calculateTotalPrice()}$
                                    </a>}


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

            <div style={{ marginTop: '95px' }}>
                <Footer />
            </div>

        </>
    )
}

export default Cart
