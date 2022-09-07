import React,{ useState ,useEffect} from 'react';
import { Table ,Image, Button} from 'antd';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

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
      title:'总价',
      dataIndex:'total'
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
      name:'mer',
      price: 32,
      number: 233,
      total:'',
    });
}
  
const MyTable = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const user=useSelector((state)=>state.user.value)

    const handleDelete=(id)=>{
      fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/update?table=trolley&&id=${id}&&method=delete`,
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
                item.delete=<Button danger onClick={()=>handleDelete(item.id)}>删除</Button>;
                item.number=1;
                item.total=(item.price*1);
              }
              // console.log(result);
              setData(()=>Array.from(result));
            }
        })
    }
    const getUserTrolley=()=>{
      fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/trolley?user=${user}&&table=trolley`,
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
          let result=response.result;  
            if(result!=null){                    
              //如果有记录，设置state并跳转到show页面
              for(let item of result){
                let pic=item.url;
                item.url=<Image width={150} src={pic}/>;
                item.key=nanoid();
                item.delete=<Button danger onClick={()=>handleDelete(item.id)}>删除</Button>
                item.number=1;
                item.total=(item.price*1);
              }
              console.log(Array.from(result));
              setData(()=>Array.from(result));
            }
        })
  }
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
    useEffect(() => {
      getUserTrolley();
    }, []);
    return (
        <div>
           <Table rowSelection={rowSelection}  columns={columns} dataSource={data} pagination={false} title={()=>`共有${data.length}件商品已经选了${selectedRowKeys.length}件}`} style={{margin:'auto',width:1300}}/>
        </div>
    );
}

export default MyTable;





