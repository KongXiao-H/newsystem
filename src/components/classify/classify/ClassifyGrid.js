import React from 'react';
import {Row,Col} from 'antd'
import { nanoid } from 'nanoid'

//分类数据展示
const ClassifyGrid = (props) => {
    return (
        <Row gutter={9}>
          {
            props.classifydata.map((value)=>{
              return <Col className="gutter-row" span={6} key={nanoid()}>
                      <div>{value.url}<div/>
                      <div>{value.des}</div>
                      </div>
                    </Col>

            })
          }
      </Row>
    );
}

export default ClassifyGrid;
