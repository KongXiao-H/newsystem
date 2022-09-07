import React,{useState} from 'react';
import { Collapse,Image, List } from 'antd';
import { nanoid } from 'nanoid';
import { useLocation} from 'react-router-dom';
import { useEffect } from 'react';

const { Panel } = Collapse;
const {Item}=List;

const UserContent = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);

    const {state}=useLocation();
    
    useEffect(() => {
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/manage?table=${state.current_page}`,
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
            let n_user=[];
            let n_data=[];
            for(let index in response){
                n_user=[...n_user,index];
                n_data=[...n_data,response[index]];
            }
            setUser(n_user);
            setData(n_data); 
            // console.log(data)
        })
    }, [state.current_page]);

    return (
        <Collapse>
            {
                user.map((value,index)=>{
                    return(
                    <Panel header={value} key={nanoid()}>
                        <List >

                        {
                            state.current_page==='user'?data[index].map((val)=>{
                                return <Item key={nanoid()}>{val.user}</Item>
                            }):data[index].map((val)=>{
                                return <Image src={val.url} style={{width:150}}/>
                            })
                        }
                        
                        </List>
                    </Panel>)
            })}
        </Collapse>
    );
}

export default UserContent;
