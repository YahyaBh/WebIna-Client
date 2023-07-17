import React from 'react'
import Logo from '../../Assets/Home/Navbar/WEBINA-Logo.png'

import './Loading.scss'

const Loading = () => {
    return (
        <div className='home-load'>
            <img src={Logo} alt="logo" />
        </div>
    )
}

export default Loading