import { Carousel,Image } from 'antd';
import React from 'react';
const contentStyle = {
  height: '320px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius:'8px'
};


const MyCarousel = () => (
  <Carousel autoplay style={{width:320,margin:25}}>
    <div>
      <Image style={contentStyle} src='https://gw.alicdn.com/imgextra/i4/474452184/O1CN01Ax55WO1S0JlJhuvDD_!!474452184-0-alimamacc.jpg_300x300q90.jpg_.webp'/>
    </div>
    <div>
      <Image style={contentStyle} src='https://gw.alicdn.com/bao/uploaded/i2/129303001/O1CN01zN2uCm1Y2VM8Y4fsl_!!0-saturn_solar.jpg_300x300q90.jpg_.webp'/>
    </div>
    <div>
      <Image style={contentStyle} src='https://gw.alicdn.com/bao/uploaded/i3/604477464/O1CN01jgEy5B250YyTLbqID_!!0-item_pic.jpg_300x300q90.jpg_.webp'/>
    </div>
    <div>
      <Image style={contentStyle} src='https://gw.alicdn.com/bao/uploaded/i3/394360729/O1CN01wS46cX1HFvT3Smdmw_!!394360729.jpg_300x300q90.jpg_.webp'/>
    </div>
  </Carousel>
);

export default MyCarousel;