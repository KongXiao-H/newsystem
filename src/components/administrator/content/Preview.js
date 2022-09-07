import React from 'react';
import {useLocation} from 'react-router-dom'
import { Badge, Descriptions } from 'antd';
import './preview.css'

const {Item} =Descriptions;

const Preview = () => {
    const {state} = useLocation();
    console.log(state.data);
    
    return (
        <Descriptions title="欢迎管理员" layout="vertical" bordered>
          <Item label="商品信息" span={3}></Item>
          <Item label="男装">共有{`${state.data[0].num}`}</Item>
          <Item label="女装">共有{`${state.data[1].num}`}</Item>
          <Item label="手机">共有{`${state.data[2].num}`}</Item>
          <Item label="美妆">共有{`${state.data[3].num}`}</Item>
          <Item label="童装">共有{`${state.data[4].num}`}</Item>
          <Item label="医疗">{`${state.data[5].num}`}</Item>
          <Item label="用户管理" span={3}>当前用户数量{`${state.data[6].num}`}</Item>
          <Item label="管理员状态" span={3}>
            <Badge status="processing" text="Running" />
          </Item>
          <Item label="本地时间">{Date.now()}</Item>
          <Item label="备注">
            暂无
          </Item>
        </Descriptions>
    );
}

export default Preview;
