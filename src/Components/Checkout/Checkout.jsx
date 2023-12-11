import React, { Profiler, useEffect, useState } from 'react'

import './Checkout.scss'

import Stripe from '../../Assets/Cart/stripe.png'

import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet-async'
import NavbarStore from '../Layout/Navbar/NavbarStore'
import { BiCart, BiCreditCard, BiPackage, BiWallet } from 'react-icons/bi'
import { MdVerified } from 'react-icons/md'
import { BsPaypal, BsStarFill } from 'react-icons/bs'
import { IoIosArrowForward, IoMdDocument } from "react-icons/io";

const Checkout = () => {

    const [loading, setLoading] = useState(true);
    const [cardNumber, setCardNumber] = useState('');


    const handleCardNumberChange = (event) => {
        const inputCardNumber = event.target.value;

        // Remove any non-numeric characters
        const formattedCardNumber = inputCardNumber.replace(/\D/g, '');

        // Add space after every 4 digits if the card number is less than 16 digits
        let spacedCardNumber;
        if (formattedCardNumber.length <= 16) {
            spacedCardNumber = formattedCardNumber.replace(/(\d{4})/g, '$1 ');
        } else {
            // Truncate extra digits if the length exceeds 16
            spacedCardNumber = formattedCardNumber.slice(0, 16).replace(/(\d{4})/g, '$1 ');
        }

        // Remove spaces for state storage
        const cardNumberWithoutSpaces = formattedCardNumber;

        // Update state with the formatted card number without spaces
        setCardNumber(spacedCardNumber.trimRight());

        // If you want to save the card number without spaces in a separate state, uncomment the line below
        // setCardNumberWithoutSpaces(cardNumberWithoutSpaces);
    };

    useEffect(() => {

        setLoading(false)

    }, [])

    return (loading ? <Loading /> :
        <>

            <Helmet>
                <title>WEBINA DIGITAL | Checkout</title>
                <meta name="description" content="Your payment gateway  , pay securly" />
                <link rel='canonical' content="/checkout" />
            </Helmet>


            <Profiler className="checkout-prof">

                <NavbarStore isNotAside={true} />


                <div id='checkout' >

                    <div className="container">

                        <div className="progress-bar">
                            <div className="shopping-cart">
                                <BiCart /> <h4>Shopping Cart</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiWallet /> <h4 className='active' >Checkout</h4>
                            </div>

                            <hr />

                            <div className="shopping-cart">
                                <BiPackage /> <h4>Order Dilevery</h4>
                            </div>
                        </div>


                        <div className="body">
                            <div className="left-cont">

                                <div className="informations">
                                    <h3><MdVerified /> Personal Information</h3>

                                    <div className="input-cont">
                                        <label htmlFor="full-name">Full Name <sup>*</sup></label>
                                        <input type="text" name='full-name' id='full-name' />
                                    </div>

                                    <div className="input-cont">
                                        <div className="email-not">
                                            <label htmlFor="email">Email Address <sup>*</sup></label>
                                            <p>You'll receive an email with your order details</p>
                                        </div>
                                        <input type="email" name='email' id='email' />

                                    </div>


                                    <div className="input-cont">
                                        <label htmlFor="business-name">Company Legal Name</label>
                                        <input type="text" name='business-name' id='business-name' />
                                    </div>

                                    <div className="input-cont">
                                        <label htmlFor="country">Business Country</label>
                                        <select className="form-select" id="country" name="country">
                                            <option value="" selected disabled hidden>Country</option>
                                            <option value="AS">Afghanistan</option>
                                            <option value="EU">Aland Islands</option>
                                            <option value="EU">Albania</option>
                                            <option value="AF">Algeria</option>
                                            <option value="OC">American Samoa</option>
                                            <option value="EU">Andorra</option>
                                            <option value="AF">Angola</option>
                                            <option value="NA">Anguilla</option>
                                            <option value="AN">Antarctica</option>
                                            <option value="NA">Antigua and Barbuda</option>
                                            <option value="SA">Argentina</option>
                                            <option value="AS">Armenia</option>
                                            <option value="NA">Aruba</option>
                                            <option value="OC">Australia</option>
                                            <option value="EU">Austria</option>
                                            <option value="AS">Azerbaijan</option>
                                            <option value="NA">Bahamas</option>
                                            <option value="AS">Bahrain</option>
                                            <option value="AS">Bangladesh</option>
                                            <option value="NA">Barbados</option>
                                            <option value="EU">Belarus</option>
                                            <option value="EU">Belgium</option>
                                            <option value="NA">Belize</option>
                                            <option value="AF">Benin</option>
                                            <option value="NA">Bermuda</option>
                                            <option value="AS">Bhutan</option>
                                            <option value="SA">Bolivia</option>
                                            <option value="NA">Bonaire, Sint Eustatius and Saba</option>
                                            <option value="EU">Bosnia and Herzegovina</option>
                                            <option value="AF">Botswana</option>
                                            <option value="AN">Bouvet Island</option>
                                            <option value="SA">Brazil</option>
                                            <option value="AS">British Indian Ocean Territory</option>
                                            <option value="AS">Brunei Darussalam</option>
                                            <option value="EU">Bulgaria</option>
                                            <option value="AF">Burkina Faso</option>
                                            <option value="AF">Burundi</option>
                                            <option value="AS">Cambodia</option>
                                            <option value="AF">Cameroon</option>
                                            <option value="NA">Canada</option>
                                            <option value="AF">Cape Verde</option>
                                            <option value="NA">Cayman Islands</option>
                                            <option value="AF">Central African Republic</option>
                                            <option value="AF">Chad</option>
                                            <option value="SA">Chile</option>
                                            <option value="AS">China</option>
                                            <option value="AS">Christmas Island</option>
                                            <option value="AS">Cocos (Keeling) Islands</option>
                                            <option value="SA">Colombia</option>
                                            <option value="AF">Comoros</option>
                                            <option value="AF">Congo</option>
                                            <option value="AF">Congo, Democratic Republic of the Congo</option>
                                            <option value="OC">Cook Islands</option>
                                            <option value="NA">Costa Rica</option>
                                            <option value="AF">Cote D'Ivoire</option>
                                            <option value="EU">Croatia</option>
                                            <option value="NA">Cuba</option>
                                            <option value="NA">Curacao</option>
                                            <option value="AS">Cyprus</option>
                                            <option value="EU">Czech Republic</option>
                                            <option value="EU">Denmark</option>
                                            <option value="AF">Djibouti</option>
                                            <option value="NA">Dominica</option>
                                            <option value="NA">Dominican Republic</option>
                                            <option value="SA">Ecuador</option>
                                            <option value="AF">Egypt</option>
                                            <option value="NA">El Salvador</option>
                                            <option value="AF">Equatorial Guinea</option>
                                            <option value="AF">Eritrea</option>
                                            <option value="EU">Estonia</option>
                                            <option value="AF">Ethiopia</option>
                                            <option value="SA">Falkland Islands (Malvinas)</option>
                                            <option value="EU">Faroe Islands</option>
                                            <option value="OC">Fiji</option>
                                            <option value="EU">Finland</option>
                                            <option value="EU">France</option>
                                            <option value="SA">French Guiana</option>
                                            <option value="OC">French Polynesia</option>
                                            <option value="AN">French Southern Territories</option>
                                            <option value="AF">Gabon</option>
                                            <option value="AF">Gambia</option>
                                            <option value="AS">Georgia</option>
                                            <option value="EU">Germany</option>
                                            <option value="AF">Ghana</option>
                                            <option value="EU">Gibraltar</option>
                                            <option value="EU">Greece</option>
                                            <option value="NA">Greenland</option>
                                            <option value="NA">Grenada</option>
                                            <option value="NA">Guadeloupe</option>
                                            <option value="OC">Guam</option>
                                            <option value="NA">Guatemala</option>
                                            <option value="EU">Guernsey</option>
                                            <option value="AF">Guinea</option>
                                            <option value="AF">Guinea-Bissau</option>
                                            <option value="SA">Guyana</option>
                                            <option value="NA">Haiti</option>
                                            <option value="AN">Heard Island and Mcdonald Islands</option>
                                            <option value="EU">Holy See (Vatican City State)</option>
                                            <option value="NA">Honduras</option>
                                            <option value="AS">Hong Kong</option>
                                            <option value="EU">Hungary</option>
                                            <option value="EU">Iceland</option>
                                            <option value="AS">India</option>
                                            <option value="AS">Indonesia</option>
                                            <option value="AS">Iran, Islamic Republic of</option>
                                            <option value="AS">Iraq</option>
                                            <option value="EU">Ireland</option>
                                            <option value="EU">Isle of Man</option>
                                            <option value="AS">Israel</option>
                                            <option value="EU">Italy</option>
                                            <option value="NA">Jamaica</option>
                                            <option value="AS">Japan</option>
                                            <option value="EU">Jersey</option>
                                            <option value="AS">Jordan</option>
                                            <option value="AS">Kazakhstan</option>
                                            <option value="AF">Kenya</option>
                                            <option value="OC">Kiribati</option>
                                            <option value="AS">Korea, Democratic People's Republic of</option>
                                            <option value="AS">Korea, Republic of</option>
                                            <option value="EU">Kosovo</option>
                                            <option value="AS">Kuwait</option>
                                            <option value="AS">Kyrgyzstan</option>
                                            <option value="AS">Lao People's Democratic Republic</option>
                                            <option value="EU">Latvia</option>
                                            <option value="AS">Lebanon</option>
                                            <option value="AF">Lesotho</option>
                                            <option value="AF">Liberia</option>
                                            <option value="AF">Libyan Arab Jamahiriya</option>
                                            <option value="EU">Liechtenstein</option>
                                            <option value="EU">Lithuania</option>
                                            <option value="EU">Luxembourg</option>
                                            <option value="AS">Macao</option>
                                            <option value="EU">Macedonia, the Former Yugoslav Republic of</option>
                                            <option value="AF">Madagascar</option>
                                            <option value="AF">Malawi</option>
                                            <option value="AS">Malaysia</option>
                                            <option value="AS">Maldives</option>
                                            <option value="AF">Mali</option>
                                            <option value="EU">Malta</option>
                                            <option value="OC">Marshall Islands</option>
                                            <option value="NA">Martinique</option>
                                            <option value="AF">Mauritania</option>
                                            <option value="AF">Mauritius</option>
                                            <option value="AF">Mayotte</option>
                                            <option value="NA">Mexico</option>
                                            <option value="OC">Micronesia, Federated States of</option>
                                            <option value="EU">Moldova, Republic of</option>
                                            <option value="EU">Monaco</option>
                                            <option value="AS">Mongolia</option>
                                            <option value="EU">Montenegro</option>
                                            <option value="NA">Montserrat</option>
                                            <option value="AF">Morocco</option>
                                            <option value="AF">Mozambique</option>
                                            <option value="AS">Myanmar</option>
                                            <option value="AF">Namibia</option>
                                            <option value="OC">Nauru</option>
                                            <option value="AS">Nepal</option>
                                            <option value="EU">Netherlands</option>
                                            <option value="NA">Netherlands Antilles</option>
                                            <option value="OC">New Caledonia</option>
                                            <option value="OC">New Zealand</option>
                                            <option value="NA">Nicaragua</option>
                                            <option value="AF">Niger</option>
                                            <option value="AF">Nigeria</option>
                                            <option value="OC">Niue</option>
                                            <option value="OC">Norfolk Island</option>
                                            <option value="OC">Northern Mariana Islands</option>
                                            <option value="EU">Norway</option>
                                            <option value="AS">Oman</option>
                                            <option value="AS">Pakistan</option>
                                            <option value="OC">Palau</option>
                                            <option value="AS">Palestinian Territory, Occupied</option>
                                            <option value="NA">Panama</option>
                                            <option value="OC">Papua New Guinea</option>
                                            <option value="SA">Paraguay</option>
                                            <option value="SA">Peru</option>
                                            <option value="AS">Philippines</option>
                                            <option value="OC">Pitcairn</option>
                                            <option value="EU">Poland</option>
                                            <option value="EU">Portugal</option>
                                            <option value="NA">Puerto Rico</option>
                                            <option value="AS">Qatar</option>
                                            <option value="AF">Reunion</option>
                                            <option value="EU">Romania</option>
                                            <option value="AS">Russian Federation</option>
                                            <option value="AF">Rwanda</option>
                                            <option value="NA">Saint Barthelemy</option>
                                            <option value="AF">Saint Helena</option>
                                            <option value="NA">Saint Kitts and Nevis</option>
                                            <option value="NA">Saint Lucia</option>
                                            <option value="NA">Saint Martin</option>
                                            <option value="NA">Saint Pierre and Miquelon</option>
                                            <option value="NA">Saint Vincent and the Grenadines</option>
                                            <option value="OC">Samoa</option>
                                            <option value="EU">San Marino</option>
                                            <option value="AF">Sao Tome and Principe</option>
                                            <option value="AS">Saudi Arabia</option>
                                            <option value="AF">Senegal</option>
                                            <option value="EU">Serbia</option>
                                            <option value="EU">Serbia and Montenegro</option>
                                            <option value="AF">Seychelles</option>
                                            <option value="AF">Sierra Leone</option>
                                            <option value="AS">Singapore</option>
                                            <option value="NA">Sint Maarten</option>
                                            <option value="EU">Slovakia</option>
                                            <option value="EU">Slovenia</option>
                                            <option value="OC">Solomon Islands</option>
                                            <option value="AF">Somalia</option>
                                            <option value="AF">South Africa</option>
                                            <option value="AN">South Georgia and the South Sandwich Islands</option>
                                            <option value="AF">South Sudan</option>
                                            <option value="EU">Spain</option>
                                            <option value="AS">Sri Lanka</option>
                                            <option value="AF">Sudan</option>
                                            <option value="SA">Suriname</option>
                                            <option value="EU">Svalbard and Jan Mayen</option>
                                            <option value="AF">Swaziland</option>
                                            <option value="EU">Sweden</option>
                                            <option value="EU">Switzerland</option>
                                            <option value="AS">Syrian Arab Republic</option>
                                            <option value="AS">Taiwan, Province of China</option>
                                            <option value="AS">Tajikistan</option>
                                            <option value="AF">Tanzania, United Republic of</option>
                                            <option value="AS">Thailand</option>
                                            <option value="AS">Timor-Leste</option>
                                            <option value="AF">Togo</option>
                                            <option value="OC">Tokelau</option>
                                            <option value="OC">Tonga</option>
                                            <option value="NA">Trinidad and Tobago</option>
                                            <option value="AF">Tunisia</option>
                                            <option value="AS">Turkey</option>
                                            <option value="AS">Turkmenistan</option>
                                            <option value="NA">Turks and Caicos Islands</option>
                                            <option value="OC">Tuvalu</option>
                                            <option value="AF">Uganda</option>
                                            <option value="EU">Ukraine</option>
                                            <option value="AS">United Arab Emirates</option>
                                            <option value="EU">United Kingdom</option>
                                            <option value="NA">United States</option>
                                            <option value="NA">United States Minor Outlying Islands</option>
                                            <option value="SA">Uruguay</option>
                                            <option value="AS">Uzbekistan</option>
                                            <option value="OC">Vanuatu</option>
                                            <option value="SA">Venezuela</option>
                                            <option value="AS">Viet Nam</option>
                                            <option value="NA">Virgin Islands, British</option>
                                            <option value="NA">Virgin Islands, U.s.</option>
                                            <option value="OC">Wallis and Futuna</option>
                                            <option value="AF">Western Sahara</option>
                                            <option value="AS">Yemen</option>
                                            <option value="AF">Zambia</option>
                                            <option value="AF">Zimbabwe</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="payment-methods">
                                    <div className="paypal">
                                        <div className="top">
                                            <div className="left">
                                                <h3>PayPal</h3>
                                            </div>

                                            <div className="right">
                                                <BsPaypal />
                                                <IoIosArrowForward />
                                            </div>
                                        </div>

                                        <div className="bottom">
                                            <p>You will be redirected to PayPal website to complete your order securely.</p>
                                        </div>
                                    </div>


                                    <div className="credit-debit">
                                        <div className="top">

                                            <div className="left">
                                                <h3>Debit or Credit Card</h3>
                                            </div>

                                            <div className="right">
                                                <BiCreditCard />
                                                <IoIosArrowForward />
                                            </div>
                                        </div>

                                        <div className="bottom">
                                            <div className="topper">

                                                <h3><MdVerified /> Add New Card</h3>
                                                <img src={'https://placehold.co/150x50'} alt="mastercard" />

                                            </div>

                                            <div className="bottomer">

                                                <p>Enter your card details</p>

                                                <div className="details">

                                                    <div className="detail">
                                                        <div className='info'>
                                                            <h4>Card Holder Name</h4>
                                                            <p>Enter the name on the card</p>
                                                        </div>
                                                        <input type="text" placeholder="John Doe" maxLength={30} />
                                                    </div>

                                                    <div className="detail">
                                                        <div className='info'>
                                                            <h4>Card Number</h4>
                                                            <p>Enter the 16-digit card number on the card</p>
                                                        </div>
                                                        <input type="text" placeholder="1234 1234 1234 1234" value={cardNumber} onChange={handleCardNumberChange} maxLength={19} />
                                                    </div>

                                                    <div className="detail">
                                                        <div className="info">
                                                            <h4>Expiry Date</h4>
                                                            <p>Enter the expiration date of the card</p>
                                                        </div>

                                                        <div className='info-row'>
                                                            <div className="inps">
                                                                <input type="text" placeholder="12" maxLength={2} />
                                                                <h4>/</h4>
                                                                <input type="text" placeholder="24" maxLength={2} />
                                                            </div>

                                                            <div className="cvv">
                                                                <div className="text">
                                                                    <h4>CVV</h4>
                                                                    <p>Security code</p>
                                                                </div>

                                                                <input type="text" placeholder="123" maxLength={4} />

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="powered-by">
                                            <p>Powered by</p>
                                            <img src={Stripe} alt="stripe" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="right-cont">
                                <div className="top">
                                    <h2><IoMdDocument /> Products</h2>
                                </div>

                                <div className="container">
                                    <div className="head">
                                        <h3>PRODUCT</h3>
                                        <h3>PRICE</h3>
                                    </div>

                                    <div className="body-sec">

                                        <div className="card">
                                            <div className="product">
                                                <img src={'https://placehold.co/200x100'} alt="product" />

                                                <div className="text">
                                                    <h4>Product name</h4>
                                                    <h5><BiCart /> 27 Purchases</h5>
                                                    <div className="stars">
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <h3>$ 100.00</h3>
                                                <IoIosArrowForward />
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="product">
                                                <img src={'https://placehold.co/200x100'} alt="product" />

                                                <div className="text">
                                                    <h4>Product name</h4>
                                                    <h5><BiCart /> 27 Purchases</h5>
                                                    <div className="stars">
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <h3>$ 100.00</h3>
                                                <IoIosArrowForward />
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="product">
                                                <img src={'https://placehold.co/200x100'} alt="product" />

                                                <div className="text">
                                                    <h4>Product name</h4>
                                                    <h5><BiCart /> 27 Purchases</h5>
                                                    <div className="stars">
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                        <BsStarFill />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <h3>$ 100.00</h3>
                                                <IoIosArrowForward />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="total">

                                        <div className="subtotal">
                                            <h4>Subtotal</h4>
                                            <h4>$ 300.00</h4>
                                        </div>

                                        <div className="discount">
                                            <h4>Discount</h4>
                                            <h4>$ 0.00</h4>
                                        </div>

                                        <div className="total-price">
                                            <h3>Total Price</h3>
                                            <h3>$ 300.00</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Profiler >
        </>

    )
}

export default Checkout