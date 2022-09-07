import React from 'react'
import { Link } from 'react-router-dom'
// import ContentItem from './Item/item'
import './celement.css'

//商品展示组件
export default function CElement(props) {

  return (
    <Link to={`/shopping/${props.info.id}`} state={{info:props.info}}>
      <div className='flex-Content'>
        <div className="pic">
          <img src={props.info.url} alt="pic"/>
        </div>
        <div className="des">{props.info.des}</div>
        <div className="price">{props.info.price}</div>
        <div style={{"clear":"both"}}></div>
      </div>
    </Link>
    
  )
}

