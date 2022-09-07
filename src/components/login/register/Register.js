import React ,{useState}from 'react';
import { useNavigate } from 'react-router';
import {useDispatch} from 'react-redux'
import {Tooltip,Form} from 'antd';
import { storeState } from '../../../redux/user-slice';
import './register.css'

const Register = (props) => {
    const [user,setUser]=useState('user');
    const [password,setPassword]=useState('');
    const [exist, setExist] = useState(false);//判断账号是否存在

    const dispatch=useDispatch();

    const resNavigate=useNavigate();

    const toRegister=()=>{
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/login?user=${user}&&password=${password}&&method=register`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
        })
        .then((response)=>{
            return response.json();
        })
        .then((response)=>{
            if(response.result===false){
                setExist(true);
            }else{
                console.log("注册成功")
                dispatch(storeState(user));
                resNavigate('/',{state:{user:user}});   
            }
            
        })
    }

    /* const toRegisterTest=()=>{
        resNavigate('/',{state:{user:user}});
    } */
    
    return (
        <Form className="register-form"> 
            <div className="title-box">
                <h1>注册</h1>
            </div>            
            <div className="input-box">
                <Tooltip title="用户名已经存在" color={'red'} visible={exist}>
                    <input type="text" placeholder="用户名" className='input' onChange={(e)=>setUser(()=>e.target.value)} pattern=".{1,10}" required/>
                </Tooltip>
                
                <input type="password" placeholder="密码" className='input' onChange={(e)=>setPassword(()=>e.target.value)} name='password'required/>
                
                <input type="password" placeholder="确认密码" className='input' required/>
                              
            </div>           
            <div className="btn-box">
                <button className='button' onClick={toRegister}>注册</button>                
                <p onClick={props.onSwitch}>已有账号?去登录</p>
            </div>
        </Form>    
    );
}

export default Register;
