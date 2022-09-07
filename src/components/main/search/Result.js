import React from 'react';
import { Row ,Col,Card,Image} from 'antd';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';


//搜索结果展示
const Result = () => {
    //从redux获取搜索的结果
    const data=useSelector((state)=>state.search_result.value);

    return (
        <div>
            <Row>
          {
            data.map((value)=>
                <Col span={4} key={nanoid()}>
                    <Card hoverable>
                        <Image width={165} src={value.url}/>
                    </Card>
                    <div>{value.des}</div>
                </Col>)
          }
          
      </Row>
        </div>
    );
}

export default Result;
