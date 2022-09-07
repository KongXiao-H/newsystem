import React from 'react';
import { useSelector } from 'react-redux';
import { Empty } from 'antd';
import MyGrid from './myGrid/MyGrid';

const Favorite = () => {
    const user=useSelector((state)=>state.user.value);
    return (    
        user?<MyGrid/>:<Empty description='还未登录'/>
    );
}

export default Favorite;
