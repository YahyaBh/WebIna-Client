import React from 'react'
import './AsideStore.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineExplore } from 'react-icons/md'
import { FiPackage } from 'react-icons/fi'

const AsideStore = () => {
  return (
    <aside>

      <div className="main-container">


        <ul>
          <li className='active'><a href='/store'><AiOutlineHome /> HOME</a></li>
          <li><a href='/store/explore'><MdOutlineExplore /> EXPLORE</a></li>
          <li><a href='/store/new'><FiPackage /> NEW</a></li>
          <li><a href='/store/free'><AiOutlineHome /> FREE</a></li>
          <li><a href='/store'><MdOutlineExplore /> HOME</a></li>
        </ul>


        <ul>
          <li><a href='/store/free'><AiOutlineHome /> FREE</a></li>
          <li><a href='/store'><MdOutlineExplore /> HOME</a></li>
        </ul>



      </div>

      <hr />
      <div className="under-container">
        <ul>
          <li>ABOUT</li>
          <li>SERVICES</li>
          <li>HIRING</li>
        </ul>
        <p>WEBINA DIGITAL © 2023 All Rights Reserved</p>
      </div>

    </aside>
  )
}

export default AsideStore