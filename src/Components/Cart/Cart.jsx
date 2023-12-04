import React, { Profiler, useEffect, useState } from 'react'

import './Cart.scss'

import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import AsideStore from '../Layout/Aside/AsideStore'
import { BiCart, BiPackage, BiWallet } from 'react-icons/bi'
import { useStoreContext } from '../../Context/StoreConetxt'
import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import { CgRemove } from "react-icons/cg";



import Paypal from '../../Assets/Cart/paypal.png'
import MasterCard from '../../Assets/Cart/mastercard.png'
import Visa from '../../Assets/Cart/visa.png'
import Stripe from '../../Assets/Cart/stripe.png'
import AuthUser from '../../Context/AuthContext'


import Swal from 'sweetalert2'


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [discount, setDiscount] = useState(0);

    const [discountAvailable, setDiscountAvailable] = useState(401);


    const [discountNumber, setDiscountNumber] = useState('');

    const { isAsideOpen } = useStoreContext();


    const { sec_http } = AuthUser();


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

        getCart();

    }, [])

    const getCart = () => {

        sec_http.get('/api/cart')
            .then((res) => {
                setProducts(res.data.products);
            })

    }


    const removeFromCart = (token) => {

        sec_http.post('/api/cart/remove/product', { product_token: token })
            .then((res) => {
                getCart();
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
                    }
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

                                {products.map((product, index) =>
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
                                        <div className="delete" onClick={() => removeFromCart(product.token)}>
                                            Remove <CgRemove />
                                        </div>
                                    </div>
                                )}

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

                                        <div><input type="text" placeholder='Coupon Code' onChange={e => setDiscountNumber(e.target.value)} value={discountNumber} /> <button onClick={discountGet}>Apply</button></div>
                                        {discountAvailable === 200 ? <p className='available'>Discount applied</p> : discountAvailable === 404 ? <p className='unavailable'>Discount not available</p> : ''}
                                    </div>

                                    <hr className='main-line' />

                                    <p className='shipping'>Get <span>instant</span> shipping and free returns</p>

                                    <a href='/store' className='continue-shopping'>Continue Shopping</a>


                                    <button className="checkout-btn">
                                        Checkout | {calculateTotalPrice()}$
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