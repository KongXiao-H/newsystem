import {Tabs ,Image,Skeleton} from 'antd';
import React, { useState ,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { nanoid } from 'nanoid';
import ClassifyGrid from './classify/ClassifyGrid';

const { TabPane } = Tabs;

/* const dataTest={
  'menwear':[
    {
      url: <Image width={125} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>,
      des: 329999999999,
      pri: 'zzzzzzzzzzz',
    },{
      url: '这不是一个实验',
      des: 999999,
      pri: 'zzzzzzzzzzz',
    },{
      url: '这就是一个实验',
      des: 3299,
      pri: 'zzzzzzzzzzz',
    },],
  'dress':[
    {
      url: <Image width={125} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>,
      des: 329999999999,
      pri: 'zzzzzzzzzzz',
    },{
      url: '这不是一个实验',
      des: 999999,
      pri: 'zzzzzzzzzzz',
    },
  ]
} */

const Classify = () => {
  const [data, setData] = useState([]);//储存后端返回的数据
  const [table, setTable] = useState('');//储存table

  const [loading, setLoading] = useState(true);

  const {state}=useLocation();
  
  const cla=['男装','女装','童装','医疗','化妆品','手机'];
  const cal_key=['menwear','dress','childrenwear','medicine','cosmetics','phone'];
  //得到分类数据
  const fetchClassifyData=(table)=>{
    setLoading(true);
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/loading?table=${table}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json,text/plain,*/*'
      },
    }).then(response=>{
      return response.json();
    })
    .then((response)=>{
      setLoading(false)
      
      let result=response.result;
      if(result!=null){
        for(let item of result){
          let pic=item.url;
          item.url=<Image width={150} src={pic}/>;
          item.key=nanoid();
        }
        setData(Array.from(result));
      }
      
    })
  }

  /* const fetchClassifyDataTest=(table)=>{
    console.log(table);
    setData(dataTest[table]);
  } */

  useEffect(() => {
    setTable(state.key);
    console.log(state);
  }, []);

  //table变化时重新发送请求
  useEffect(() => {
    fetchClassifyData(table);
  }, [table]); 

  return(
    <div style={{overflowX:'hidden'}}>
      <Tabs
        defaultActiveKey={{table}}
        tabPosition={'left'}
        onTabClick={(table)=>{setTable(table);console.log(table)}}
      >
        {[
          ...Array.from(
            {
              length: 8,
            },
            (_, i) => i,
          ),
        ].map((i) => (
          
          <TabPane tab={cla[i]} key={cal_key[i]}>
            <Skeleton active loading={loading}>
              <ClassifyGrid classifydata={data}/>
            </Skeleton>
          </TabPane >
          
        ))}
      </Tabs>
    </div>
    
  )
  
}

export default Classify;
