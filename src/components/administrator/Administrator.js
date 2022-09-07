import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusSquareTwoTone,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import './administrator.css'
import { Outlet ,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


const { Header, Sider, Content } = Layout;
const Administrator = () => {
  const [collapsed, setCollapsed] = useState(false);//用于控制触发器

  const navigate=useNavigate();

  const pro_list=['男装','女装','童装','医疗','化妆品','手机'];
  const pro_key=['menwear','dress','childrenwear','medicine','cosmetics','phone']
  const u_list=['用户','购物车','收藏夹'];
  const u_key=['user','trolley','favourite'];

  const onSelect=({key})=>{
    console.log(key)
    if(key==='1'){
      navigate('/manager/preview');
    }else if(key==='user'||key==='trolley'||key==='favourite'){
      navigate(`/manager/user`,{state:{current_page:key}});
    }else{
      navigate('/manager/details',{state:{current_page:key}});
    }
    
  }
  //通过fetch初始化页面
  useEffect(() => {
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/statistic?table=${pro_key},user`,
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
      navigate('/manager/preview',{replace:true,state:{data:Array.from(result)}})
      
    })
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '管理员',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '商品管理',
              children:pro_list.map((value,index)=>{
                return {
                  key:pro_key[index],
                  icon:<UploadOutlined/>,
                  label:value
                }
              })
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '用户管理',
              children:u_list.map((value,index)=>{
                return {
                  key:u_key[index],
                  icon:<UploadOutlined/>,
                  label:value
                }
              })
            },
          ]}
          onSelect={onSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style:{float:'left',marginTop:20},
          })
          }
          {
            React.createElement(PlusSquareTwoTone,{style:{color:'red',float:'right',marginTop:20,marginRight:40,fontSize:'2em'},title:'点击添加信息',className:'plus',onClick:()=>navigate('/manager/plus')})
          }
          <div style={{clear:'both'}}></div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 680,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
    
}

export default Administrator;
