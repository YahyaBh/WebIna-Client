import React, { Profiler, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../Layout/Navbar/Navbar'
import Loading from '../Loading/Loading'
import './About.scss'
import AboutMain from '../../Assets/About/About-Main.png'
import AboutMain2 from '../../Assets/About/About-Main2.png'
import AboutMain3 from '../../Assets/About/About-Main3.png'
import Footer from '../Layout/Footer/Footer'



const About = () => {


    const [loading, setLoading] = useState(true);


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

                        </div>
                    </div>
                </div>



                <Footer />
            </Profiler>
        </div>
    )
}

export default About