import React, { useState } from 'react'
import './AsideStore.scss'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineExplore } from 'react-icons/md'
import { FiPackage } from 'react-icons/fi'
import { useStoreContext } from '../../../Context/StoreConetxt'

const AsideStore = ({ props }) => {

  const { toggleAside, isAsideOpen } = useStoreContext();

  return (
    <aside className={isAsideOpen ? 'aside-active' : ''}>

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