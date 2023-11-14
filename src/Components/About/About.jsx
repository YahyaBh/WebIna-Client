import React, { Profiler, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../Layout/Navbar/Navbar'
import Loading from '../Loading/Loading'
import './About.scss'
import AboutMain from '../../Assets/About/About-Main.png'
import AboutMain2 from '../../Assets/About/About-Main2.png'
import AboutMain3 from '../../Assets/About/About-Main3.png'
import Footer from '../Layout/Footer/Footer'
import { BsX } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward, IoMdStar, IoMdStarOutline } from 'react-icons/io'
import AuthContext from '../../Context/AuthContext'
import ContactImg from '../../Assets/Home/Contact Section/at-dynamic-color.svg'





import i18next from 'i18next'


import TestFeed from '../../Assets/Home/FeedBack Section/TestFeed.png'
import Swal from 'sweetalert2'



const About = () => {


    const [loading, setLoading] = useState(true);
    const [testiomonials, setTestiomonials] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { http, csrf, isAuthenticated } = AuthContext();


    useEffect(() => {
        http.get('/api/home')
            .then((res) => {
                setTestiomonials(res.data.testimonials);
                setLoading(false);

            })
            .catch((err) => {
                console.log(err.message);
            })

        setLoading(false);

    }, [])

    const handleContactMessage = async (e) => {
        e.preventDefault();

        if (name !== '' && email !== '' && message !== '') {

            const contactData = new FormData();

            contactData.append('name', name)
            contactData.append('email', email)
            contactData.append('message', message)

            csrf()
            await http.post('/api/contact', contactData)
                .then((res) => {
                    Swal.fire({
                        title: 'Thank You !',
                        text: res.data.message,
                        icon: 'success',
                        confirmButtonColor: 'var(--black-color)'
                    })
                })
                .catch((err) => {
                    Swal.fire(
                        'Error',
                        err.response.data.message,
                        'error'
                    )
                })

        }

    }


    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, 1500);

    }, [])

    return (
        <div>

            <Helmet>
                <title>WEBINA DIGITAL | About</title>
                <meta name="description" content="Find more informations about Webina Digital , the #1 Digital Company" />
                <link rel='canonical' content="/about" />
            </Helmet>





            <Profiler id='About'>

                {loading ? <Loading /> : ''}

                <Navbar target={'about'} />

                <div id='About'>
                    <div id="luxy">
                        <section id='section-main' className="luxy-el" data-speed-y="20" data-offset="50">

                            <div className='container' >

                                <div className='left-cont'>
                                    <h1>Who We Are</h1>
                                    <p>WEBINA DIGITAL is a dynamic company that was officially established in the year 2021 and is duly registered in the United Kingdom. The core mission of WEBINA DIGITAL is to empower its clients, enabling them to propel their businesses and careers to new heights. This is achieved through a commitment to helping individuals and organizations find the equilibrium necessary to harmonize their objectives with the demands of the modern age and the aspirations of newer generations.</p>
                                </div>

                                <div className="right-cont">
                                    <img src={AboutMain} alt="about-main" />
                                </div>

                            </div>
                            <div className='container' >


                                <div className="right-cont">
                                    <img src={AboutMain2} alt="about-main2" />
                                </div>

                                <div className='left-cont'>
                                    <h1>Mission and Vision</h1>
                                    <p>Our primary and unwavering mission is to guide you through the transformative journey of digitizing your organization. In today's fast-paced and tech-driven world, embracing digitalization is not merely a choice but a necessity for staying competitive and relevant. At the core of our mission lies the firm belief that digitalization holds the key to unlocking your organization's full potential.</p>
                                </div>


                            </div>
                            <div className='container' >

                                <div className='left-cont'>
                                    <h1>History Of WEBINA </h1>
                                    <p>Since its inception, WEBINA DIGITAL has remained steadfast in its commitment to prioritizing client comfort and satisfaction. Our journey as a company has been shaped by a deep understanding that our clients are at the heart of everything we do. This client-centric approach is not just a philosophy; it's a core value that drives our daily operations and decision-making.</p>
                                </div>

                                <div className="right-cont">
                                    <img src={AboutMain3} alt="about-main3" />
                                </div>

                            </div>

                        </section>


                        <section className="team" id="team">

                            <h2>MEET THE TEAM</h2>

                            <div className="container-team">
                                <div className="container">
                                    <img src={AboutMain} alt="team_member1" />
                                </div>

                                <div className="container">
                                    <img src={AboutMain2} alt="team_member2" />
                                </div>
                            </div>
                        </section>

                        <div className="projects-about" id='projects-about'>


                            <div className="container">
                                <div className="text-container">
                                    <h2>Projects & Products</h2>

                                    <p>Our projects at WEBINA DIGITAL are meticulously designed and executed with a commitment to presenting our clients with the most efficient, modern, and safe solutions. We understand that each project is a unique opportunity to showcase innovation, address specific challenges, and ultimately ensure our client's success.</p>

                                </div>

                                <img src={AboutMain2} alt="projects&products" />
                            </div>
                        </div>



                        <div className="social-media" id='social-media'>


                            <div className="container">

                                <div className="card"><a href='https://facebook.com/webina'>FACEBOOK</a></div>
                                <div className="card"><a href='https://instagram.com/_webina'>INSTAGRAM</a></div>
                                <div className="card"><a href='https://tiktok.com/_webina'>TIKTOK</a></div>
                                <div className="card"><a href='https://whatsapp.com/webina'>WHATSAPP</a></div>
                                <div className="card"><a href='https://twitter.com/_webina'>TWITTER</a></div>
                                <div className="card"><a href='https://dribble.com/_webina'>DRIBBLE</a></div>


                            </div>


                        </div>

                        <div className="faqs" id="faqs">
                            <h2>FAQs:</h2>


                            <div className="container">

                                <div className="card">
                                    <div className="left">
                                        <h3>01</h3>
                                    </div>

                                    <div className="right">
                                        <h3>Question question</h3>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec justo eget odio dictum vehicula. Sed ac libero id arcu tempor congue. Nulla facilisi. Duis bibendum, libero sed varius gravida, quam quam malesuada turpis, ac eleifend odio urna non lectus.</p>
                                    </div>

                                    <div className="close">
                                        <BsX />
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="left">
                                        <h3>02</h3>
                                    </div>

                                    <div className="right">
                                        <h3>Question question</h3>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec justo eget odio dictum vehicula. Sed ac libero id arcu tempor congue. Nulla facilisi. Duis bibendum, libero sed varius gravida, quam quam malesuada turpis, ac eleifend odio urna non lectus.</p>
                                    </div>

                                    <div className="close">
                                        <BsX />
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="left">
                                        <h3>03</h3>
                                    </div>

                                    <div className="right">
                                        <h3>Question question</h3>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec justo eget odio dictum vehicula. Sed ac libero id arcu tempor congue. Nulla facilisi. Duis bibendum, libero sed varius gravida, quam quam malesuada turpis, ac eleifend odio urna non lectus.</p>
                                    </div>

                                    <div className="close">
                                        <BsX />
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="left">
                                        <h3>04</h3>
                                    </div>

                                    <div className="right">
                                        <h3>Question question</h3>

                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec justo eget odio dictum vehicula. Sed ac libero id arcu tempor congue. Nulla facilisi. Duis bibendum, libero sed varius gravida, quam quam malesuada turpis, ac eleifend odio urna non lectus.</p>
                                    </div>

                                    <div className="close">
                                        <BsX />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="location" id="location">
                            <h2>Location</h2>


                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9078263132014!2d-0.12101464065452619!3d51.5149070102727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876053635f6ad89%3A0x7ad60141523f84e4!2sWebina%20Digital!5e0!3m2!1sar!2sma!4v1697489523699!5m2!1sar!2sma" width="100%" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                        </div>


                        <div className='customers-feedback'>
                            {feedback(testiomonials)}

                            <div className="swiper-pag"></div>

                        </div>


                        <div className='contact-us'>

                            <h2>{i18next.t('CONTACT_US')}</h2>
                            <div className='container'>
                                <div className='left-container'>
                                    <form onSubmit={e => handleContactMessage(e)}>
                                        <input type="text" placeholder={i18next.t("NAME")} name='name' id='name' onChange={e => setName(e.target.value)} value={name} />

                                        <input type="email" placeholder={i18next.t("EMAIL")} name='email' id='email' onChange={e => setEmail(e.target.value)} value={email} />

                                        <textarea name="message" id="message" placeholder={i18next.t("MESSAGE")} cols="30" rows="10" onChange={e => setMessage(e.target.value)} value={message} />

                                        <button type='submit' >{i18next.t('SEND_MESSAGE')}</button>
                                    </form>
                                </div>


                                <div className="right-container">
                                    <img src={ContactImg} alt="contact-img" />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>



                <Footer />
            </Profiler>
        </div>
    )
}

export default About


const feedback = (testiomonials) => {

    const RatingStars = ({ rating, maxRating }) => {
        const filledStars = Array.from({ length: rating }, (_, index) => (
            <IoMdStar key={index} />
        ));

        const emptyStars = Array.from({ length: maxRating - rating }, (_, index) => (
            <IoMdStarOutline key={index} />
        ));

        return (
            <div>
                {filledStars}
                {emptyStars}
            </div>
        );
    };
    return (
        <>
            <div className='header-feed'>
                <div>
                    <h2>{i18next.t("OUR_CUSTOMER")} <span>{i18next.t("FEEDBACK")}</span></h2>
                    <p>{i18next.t("FEEDBACK_PAG")}</p>
                </div>

                <div className='swiper-buttons'>
                    <div className='swiper-button-pre'><IoIosArrowBack /> {i18next.t("PREVIOUS")}</div>
                    <div className='swiper-button-nex'>{i18next.t("NEXT")} <IoIosArrowForward /></div>
                </div>
            </div>

{/* 
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                pagination={{
                    el: '.swiper-pag',
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.swiper-button-pre',
                    nextEl: '.swiper-button-nex',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {testiomonials?.map((testiomonial, index) =>
                    <SwiperSlide key={index}>
                        <div className="container">
                            <div className='header'>
                                <img src={testiomonial.image ? testiomonial.image : TestFeed} alt={"FeedBack Pic" + index} />


                                <div className='stars-feed'>
                                    <RatingStars rating={testiomonial.rating} maxRating={5} />
                                </div>
                            </div>

                            <div className='body'>
                                <h3>{testiomonial.name}</h3>
                                <p>{testiomonial.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper> */}



        </>
    )
}