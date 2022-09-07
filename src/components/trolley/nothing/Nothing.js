import React from 'react';
import MyEmpty from '../../empty/MyEmpty'

const Nothing = () => {
    const height=document.body.clientHeight;
    return (
        <div style={{height:height}}>
            <div>购物车还没有商品</div>
            <MyEmpty/>
        </div>
    );
}

export default Nothing;
