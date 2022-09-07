import React, {useState } from 'react';
import { useNavigate } from 'react-router';
import {useDispatch } from 'react-redux';
import { storeState } from '../../../redux/user-slice';
import './loginform.css'


const LoginForm = (props) => {
    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');
    // const user1=useSelector((state)=>state.user.value);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const onUserChange=(e)=>{
        setUser(()=>e.target.value);
    }
    const onPwdChange=(e)=>{
        setPassword(e.target.value);
    }

    const toLogin=()=>{
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/login?user=${user}&&password=${password}&&method=login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*',
          },
        })
        .then((response)=>{
            return response.json();
        })
        .then((response)=>{
            if(response.result===false){
                alert("账号密码错误或账号不存在");
                console.log("error");
            }else{
                dispatch(storeState(user));
                console.log("correct");
                navigate('/',{state:{user:user}});
            }   
        })
    }

    /* const toLoginTest=()=>{
        dispatch(storeState(user));
        // navigate('/',{state:{user:user}});   
    } */
    return (
        <div className="login-form">        
            <div className="title-box">
                <h1>登录</h1>
            </div>
        
            <div className="input-box">
                <input type="text" placeholder="用户名" className='input' onChange={onUserChange} value={user}/>
                <input type="password" placeholder="密码" className='input' onChange={onPwdChange} value={password}/>
            </div>            
            <div className="btn-box">
                <button className='button' onClick={toLogin}>登录</button>                
                <button className='button' onClick={()=>navigate('/manager',{replace:true,state:{manager:user}})}>管理员登录</button>                
                <p onClick={props.onSwitch}>没有账号?去注册</p>
            </div>
        </div>
    );
}

export default LoginForm;
