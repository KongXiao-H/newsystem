import { Comment, List, Tooltip ,Image,Tag,InputNumber} from 'antd';
import {useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
import moment from 'moment';
import React,{useEffect, useState} from 'react';
import './merchandise.css'
//模拟评论信息
const commentdata = [
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: '***',
    avatar: 'https://gw.alicdn.com/bao/uploaded/i4/720621221/O1CN01AJiZtq1KtGMABLzjQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
    content: (
      <p>
        贼棒好吧
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
    author: 'qqq',
    avatar: 'https://gw.alicdn.com/bao/uploaded/i4/720621221/O1CN01AJiZtq1KtGMABLzjQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',
    content: (
      <p>
        辣鸡
      </p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
];

// const mockData={url:'https://gw.alicdn.com/bao/uploaded/i4/720621221/O1CN01AJiZtq1KtGMABLzjQ_!!0-item_pic.jpg_300x300q90.jpg_.webp',price:23,des:'456789'}

const Merchandies = () => {
    const {state}=useLocation();
    const [data, setData] = useState([]);

    const user=useSelector((state)=>state.user.value); 

    useEffect(() => {
      const value=[]
      value.push(user);
      value.push(state.info.id)
      setData(()=>value);
    }, []);

    const pushTotrolley=()=>{
      fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/update?method=insert&&table=trolley&&field=user,proid&&value=${data}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
        })
        .then((resp)=>{
          return resp.text()
        })
        .then((resp)=>{
          if(resp==="1"){
            console.log("加入成功");
            alert("加入成功")
          }else{
            alert("加入失败");
          }
        })
    }

    return(
      <div className="mer">
        <div className="details">
          <div className="picture" >
            <Image src={state.info.url} width={300}/>
          </div>
          <div className="mainpart" >
            <div className="desc">
              <List style={{fontSize:20,textAlign:'left'}}>{state.info.des}</List>
            </div>
            <div className="pri" style={{width:500}}>
              <List>
              <InputNumber min={1} max={10} defaultValue={1} style={{float:'left',margin:'40px 20px',width:120,height:40,fontSize:18,borderRadius:8}}/>
                <Tag style={{width:120,height:40,backgroundColor:'hsl(228, 22%, 95%)',margin:'40px 20px',float:'left',fontSize:18,paddingTop:8,borderRadius:8}}>{state.info.price}</Tag>
              </List>
            </div>
            <div className="option">
              <button className='join_button' onClick={pushTotrolley} disabled={!user}>加入购物车</button>
              <button className='buy_button'>立刻购买</button>
              <div style={{clear:'both'}}></div>
            </div>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        <List
          className="comment-list"
          header={`${commentdata.length} 评论`}
          itemLayout="horizontal"
          dataSource={commentdata}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
          style={{textAlign:'left'}}
        />
      </div>
    
  )
};

export default Merchandies;
