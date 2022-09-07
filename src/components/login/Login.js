import React,{ useState ,useEffect} from 'react'
import CoverForm from './coverform/CoverForm'
import LoginForm from './loginform/LoginForm'
import Register from './register/Register'
import { useLocation } from 'react-router-dom'
import head from '../../img/下一个就是你了.jpg'
import head2 from '../../img//head2.jpg'
import './login.css'
import { nanoid } from 'nanoid'


export default function Login() {
    const {state}=useLocation()//用于判断是登陆还是注册

    const rstyle={
        'transform': "translateX(100%)",
        'backgroundColor': '#7690B8'
    }//注册
    const lstyle={
        "transform": "translateX(0%)",
        "backgroundColor": "#1B5489"
    }//登录

    const [style, setstyle] = useState(state.option==='login'?lstyle:rstyle);
    const [flag, setflag] = useState(state.option==='login'?true:false);
    const [purl, setpurl] = useState(state.option==='login'?head:head2);//头像url

    const [buble, setBuble] = useState();

    const bubleCreate=()=>{
        const list=[];
        for(let i=0;i<8;i++){
            list.push(React.createElement('span',{className:'buble',style:{width:Math.random()*5 + 25,height:Math.random()*5 + 25,left:Math.random()*1200,top:Math.random()*600},key:nanoid()}))
        }
        setBuble(list);
    }

    const onSwitch = () =>{
        if (flag) {
            setstyle(rstyle)
            setpurl(head2);
        } else {
            setstyle(lstyle);
            setpurl(head);
        }
        setflag(!flag);
    }

    useEffect(() => {
        const timer=setInterval(bubleCreate, 8000);
        return () => {
            clearInterval(timer);
        };
    });

    const height=document.body.clientHeight;
    return (
        <div>
            <div style={{backgroundColor:'hsl(208, 52%, 85%);',height:height}}>
                <div className="box">
                    <CoverForm purl={purl} style={style}/>
                    <Register  onSwitch={onSwitch}/>
                    <LoginForm onSwitch={onSwitch}/>
                </div> 
            </div>
            {buble}
        </div>
    )
}
