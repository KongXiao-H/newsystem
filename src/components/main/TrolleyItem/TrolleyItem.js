import React from 'react'
import { List ,Card,Image} from 'antd'
import { useState ,useEffect} from 'react';
import './TrolleyItem.css'
import { useSelector } from 'react-redux';


export default function TrolleyItem() {
  const [data, setData] = useState([]);

  const user=useSelector((state)=>state.user.value);
  
  useEffect(() => {
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/trolley?table=trolley&&user=${user}`,
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
            // console.log(response.result);
            if(response.result!=null){
              setData(Array.from(response.result).slice(0,6));
            }
          })
    
  }, []);

  return (
    <div>
      <List
        grid={{  column: 3 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Image src={item.url} style={{height:100,width:100}}/>
          </List.Item>
    )}
  />
    </div>
  )
}
