import React,{useEffect,useState} from 'react';
import { Avatar, Button, Divider ,Breadcrumb} from 'antd';
import { useDispatch } from 'react-redux';
import { logoutState } from '../../../redux/user-slice';
import head from '../../../img/下一个就是你了.jpg'
import './wel.css'

const Wel = (props) => {
    const dispatch=useDispatch();
    const [stat, setStat] = useState([{num:0},{num:0}]);

    const {user}=props;

    const logout=()=>{
        dispatch(logoutState());
    }
    const fetchStat=()=>{
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/statistic?table=trolley,favourite&&user=${user}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*'
          },
        })
        .then((resp)=>{
          return resp.json()
        })
        .then((resp)=>{
          let result=resp.result;
          setStat(()=>Array.from(result));
          console.log(stat);
        })
        
    }
    useEffect(() => {
        fetchStat();
    }, []);
    return (
        <div>
            <Avatar
                style={{
                    verticalAlign: 'middle',
                    height:100,
                    width:100
                }}
                size="large"
                src={head}
            />
            <Divider>Hi!{props.user}</Divider>
            <div style={{margin:'35px auto'}}>
                <Breadcrumb style={{fontSize:18}} >
                    <Breadcrumb.Item>购物车</Breadcrumb.Item>
                    <Breadcrumb.Item>收藏夹</Breadcrumb.Item>
                    <Breadcrumb.Item>消息</Breadcrumb.Item>
                </Breadcrumb>
                <Breadcrumb style={{fontSize:18,marginTop:35}}>
                    <Breadcrumb.Item>{stat[0].num}</Breadcrumb.Item>
                    <Breadcrumb.Item>{stat[1].num}</Breadcrumb.Item>
                    <Breadcrumb.Item>0</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Button danger onClick={logout}>登出</Button>
        </div>
        
        
    );
}

export default Wel;
