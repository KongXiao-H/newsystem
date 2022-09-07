import { SearchOutlined } from '@ant-design/icons';
import { Input} from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setResult } from '../../../redux/search-slice';
import './MSearch.css';

const { Search } = Input;


// 搜索框组件
export default function MSearch() {
  const [key, setKey] = useState('');

  const dispatch=useDispatch();

  const navigate=useNavigate();

  const onChange=(e)=>{
    setKey(e.target.value);
  }
  //向后端发送fetch请求
  const onSearch = () => {
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/search?key=${key}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
        })
        .then((response)=>{
            return response.json();
        })
        .then((response)=>{
          let result=response.result;
          console.log(result);
          if(result.length!==0){
            dispatch(setResult(Array.from(result))); 
            navigate('/search');
          }else{
            navigate('/empty');
          }
          
        })
  }
  return (
    <div className="search-body">   
      <Search
      placeholder="input search text"
      enterButton={<SearchOutlined/>}
      size="middle"
      onChange={onChange}
      onSearch={onSearch}
      style={{width:300}}
    />   
    </div>
  )
}
