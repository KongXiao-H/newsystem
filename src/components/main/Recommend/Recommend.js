import React from 'react'
import {useState } from 'react';
import CElement from '../CElement/CEelement';
import './recommend.css'

//推荐商品组件
export default function Recommend() {
  const [info] = useState([]);
  
  return ( 
    // map遍历总的recommend
    <div className='rcmd' >
      {
        info.map((value,index)=>(
          <CElement key={index} url={value}/>
        )
        )
      }
      
    </div>
  )
}
