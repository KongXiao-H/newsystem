import React from 'react'
import {Link} from 'antd'
// import { useState } from 'react'
import './item.css'

//单个商品组件
export default function ContentItem(props) {

  return (
    <div className='item'>
      <div className="pic">
        <Link href={"https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html"}><img src="https://gw.alicdn.com/bao/uploaded/i4/720621221/O1CN01AJiZtq1KtGMABLzjQ_!!0-item_pic.jpg_300x300q90.jpg_.webp" alt="pic" /></Link>
      </div>
      <div className="des">{props.des}</div>
      <div className="price">{props.price}</div>
      <div style={{"float":"both"}}></div>
    </div>
  )
}
