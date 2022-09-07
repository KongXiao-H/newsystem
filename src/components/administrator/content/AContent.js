import React ,{ useEffect, useState }from 'react';
import { Table ,Image, Button} from 'antd';
import {PlusOutlined } from '@ant-design/icons';
import {useLocation } from 'react-router-dom'
import {nanoid} from 'nanoid'
import './acontent.css'

const columns = [
    {
      title:'图片展示',
      dataIndex:'url',
      width:'175px'
    },
    {
      title: '商品名称',
      dataIndex: 'des',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '数量',
      dataIndex: 'number',
    },
    {
      title:'删除',
      dataIndex:'delete'
    }
  ];

let dataTest = [];
  
for (let i = 0; i < 46; i++) {
    dataTest.push({
      key: i,
      pic: <Image width={125} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>,
      des:'mer',
      price: 32,
      number: 233,
    });
}
 
const AContent = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const {state}=useLocation();
  // console.log(state.current_page);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: '选择奇数商品',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((_, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
      ],
  };

  const handleDelete=(id,table)=>{
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/update?table=${table}&&id=${id}&&method=delete`,
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
          let result=response.result;
            if(result!=null){
              for(let item of result){
                let pic=item.url;
                item.url=<Image width={125} src={pic}/>;
                item.number=23;
                item.key=nanoid();
                item.delete=<Button danger onClick={()=>handleDelete(item.id,state.current_page)}>删除</Button>;
              }
              // console.log(result);
              setData(Array.from(result));
            }
        })
  }

  useEffect(() => {
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/loading?table=${state.current_page}`,
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
          let result=response.result;
            if(result!=null){
              for(let item of result){
                let pic=item.url;
                item.url=<Image width={125} src={pic}/>;
                item.number=23;
                item.key=nanoid();
                item.delete=<Button danger onClick={()=>handleDelete(item.id,state.current_page)}>删除</Button>;
              }
              // console.log(result);
              setData(Array.from(result));
            }
        })
  }, [state.current_page]);

    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} title={()=>`共有${data.length}件商品已经选了${selectedRowKeys.length}件`} style={{margin:'auto',width:1300,transition:'all .5s'}} rowClassName={()=>'merchandise_content'}/>
    );
}

export default AContent;
