import React,{ useEffect, useState } from 'react';
import {Image} from 'antd';
import { Row,Col,Card} from 'antd';
import {useSelector} from 'react-redux'
import {nanoid} from 'nanoid'
  
let dataTest = [];
  
for (let i = 0; i < 46; i++) {
    dataTest.push({
      key: i,
      name: <Image width={65} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>,
      price: 32,
      number: 233,
    });
}
  
const MyGrid = () => {
    const [data, setData] = useState([]);
    // const navigate=useNavigate()

    const user=useSelector((state)=>state.user.value);

    const getUserFavourite=()=>{
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/trolley?table=favourite&&user=${user}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              'Accept': 'application/json,text/plain,*/*'
            },
          })
          .then((response)=>{
              return response.json()
          })
          .then((response)=>{
            console.log(response.result);
            if(response.result!=null){
              setData(Array.from(response.result));
            }
          })
    }
    
    useEffect(() => {
      getUserFavourite();
    }, []);
    return (
      <div className="fav" style={{margin:'auto',width:1300}}>
      <Row>
          {
            data.map((value)=><Col span={4} key={nanoid()}><Card hoverable><Image width={165} src={value.url}/></Card></Col>)
          }
          
      </Row>
  </div>
    );
}

export default MyGrid;





