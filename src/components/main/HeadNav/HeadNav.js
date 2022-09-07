import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector} from 'react-redux';
import { Menu } from 'antd';
import { AppstoreOutlined,ShoppingCartOutlined,StarOutlined,MessageOutlined,UserAddOutlined,UserOutlined} from '@ant-design/icons';
import bgImage from '../../../img/bi3.jpg'
import MySearch from '../MSearch/MSearch'
import './HeadNav.css'

export default function HeadNav() {
  const user= useSelector((state)=>state.user.value);

  const items = [
    { 
      label: <Link to='/login' state={{option:'login'}}>{user?`欢迎${user}`:'请登录'}</Link>, 
      key: 'item-1',
      icon:<UserOutlined /> },
    { 
      label: <Link to='/login' state={{option:'resgiter'}}>免费注册</Link>, 
      key: 'item-2',
      icon:<UserAddOutlined /> },
    {
      label: <Link to='/mess'>消息</Link>,
      key: 'item6',
      icon:<MessageOutlined />
    },
    {
      label:<MySearch/>,
      key:'search',
    },
    {
      label:<Link to='/trolley' state={{user:'233'}}>购物车</Link>, 
      key: 'item-3', 
      icon:<ShoppingCartOutlined />
    },
    {
      label: <Link to='/classify' state={{key:'menwear'}}>商品分类</Link>, 
      key: 'item-4', 
      children:[
        {label: <Link to='/classify' state={{key:'menwear'}}>男装</Link>, key: 'submenu-item-1'},
        {label: <Link to='/classify' state={{key:'dress'}}>女装</Link>, key: 'submenu-item-2'},
        {label: <Link to='/classify' state={{key:'childrenwear'}}>童装</Link>, key: 'submenu-item-3'},
        {label: <Link to='/classify' state={{key:'medicine'}}>医疗</Link>, key: 'submenu-item-4'},
        {label: <Link to='/classify' state={{key:'cosmetics'}}>化妆品</Link>, key: 'submenu-item-5'},
        {label: <Link to='/classify' state={{key:'phone'}}>手机</Link>, key: 'submenu-item-6'}
      ],
      icon:<AppstoreOutlined/>
    },
    {
      label: <Link to='/favorite'>收藏夹</Link>,
      key: 'item5',
      icon:<StarOutlined />
    },
    
  ];
  
  return (
    <div style={{backgroundImage:`url(${bgImage})`,height:200}}>
      <Menu items={items} mode="horizontal" style={{flex: "auto",justifyContent: 'space-evenly'}}/>
    </div>
    
     
  )
  
}
