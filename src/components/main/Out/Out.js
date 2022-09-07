import React from 'react'
import { Button ,Divider,Empty} from 'antd'
import MyCarousel from './MyCarousel/MyCarousel'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import Wel from './Wel';
import TrolleyItem from '../TrolleyItem/TrolleyItem'
import u from '../../../img/登录.svg'
import t from '../../../img/购物车_o.svg'
import './Out.css'


const data = [
  '男装',
  '女装',
  '童装',
  '医疗',
  '美妆',
  '手机'
];
const key=['menwear','dress','childrenwear','medicine','cosmetics','phone'];

// 登录分类轮播图
export default function Out() {
  const user=useSelector((state)=>state.user.value);
  console.log(user);

  const navigate=useNavigate();

  return (
    <div className="out">
      <div className="out_item">
        <MyCarousel/>
      </div>
      <div className="out_main">
        <div className='out_avert'>
          {user?<Wel user={user}/>:<Empty imageStyle={{height:'100%'}} style={{height:'75%'}} description="还没有登录账号" image={u}><Button><Link to='/login' state={{option:'login'}}>去登录</Link></Button></Empty>}
        </div>
        <div className='main_inner'>
          <div className='out_classify'>
            <Divider>分类</Divider>
            {data.map((value,index)=><Button className='classify_item' key={nanoid()} onClick={()=>navigate('/classify',{state:{key:key[index]}})}>{value}</Button>)}
          </div>
          <div className='trolley_item'>
            {user?<TrolleyItem/>:<Empty image={t} style={{height:'100%',marginTop:25}} description="还没有登录账号"></Empty>}
          </div>
        </div>
      </div>
    </div>
       

  )
}
