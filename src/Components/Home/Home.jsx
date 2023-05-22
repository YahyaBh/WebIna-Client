import React, { Fragment } from 'react'
import './Home.scss'
import Navbar from '../Layout/Navbar/Navbar'
import Computer from '../../Assets/Home/Section 1 Main/ComputerSectionHome.png'
import { BsArrowRight } from 'react-icons/bs'

const Home = () => {
    return (
        <Fragment>

            <Navbar target={'home'} />

            <div id='Home'>


                <section id='section-main'>
                    <div className='main-container'>
                        <div className='left-container'>
                            <h1>GET <span>YOUR</span> WEBSITE</h1>

                            <p>We are gonna create a well developed and designed website from your own choice and it will exactly as you desire and want .
                                The website you want will be created with high quality ,
                                our team which is formed with experienced programmers and designers will take of every corner.</p>

                            <button>GET STARTED</button>


                            <div className='undertext'>
                                <BsArrowRight />
                                <h4>CHANGE YOUR <br /> IDEA TO A BUSINESS</h4>
                            </div>

                        </div>

                        <div className='right-container'>
                            <img src={Computer} alt='computer3d' />
                        </div>
                    </div>
                </section>

                <section id='section-second'>

                </section>

            </div>
        </Fragment>

    )
}

export default Home