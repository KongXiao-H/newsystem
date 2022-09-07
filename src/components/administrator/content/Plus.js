import React,{ useState} from 'react';
import {Image,Input,Button,Select,Form,Upload,Modal} from 'antd'
import {UserOutlined,PictureOutlined,PayCircleOutlined,PlusOutlined} from '@ant-design/icons'
import pic_loading from '../../../img/上传.svg'
import './plus.css'
import Intro from '../../main/test/Intro';

const {Option }=Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Plus = () => {
    const [table, setTable] = useState('');
    const [des, setDes] = useState('');
    const [url, setUrl] = useState('');
    const [pri, setPri] = useState('');

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewVisible(false);
    const handleFileChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
  
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    
    const submit=()=>{
        fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/update?table=${table}&&field=des,url,price&&des=${des}&&url=${url}&&price=${pri}&&method=insert`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json,text/plain,*/*',
          },
        })
        .then((response)=>{
            return response.text();
        })
        .then((response)=>{
          if(response==='1'){
            alert('添加成功')
          }
        })
    }

    const handleChange=(value)=>{
        // console.log(value)
        setTable(value);    
    }

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          Upload
        </div>
      </div>
    );
    return (
        <div style={{padding:'50px 200px'}}> 
          <Form  method='post' className='plus_form'>
            <Upload
              action="http://localhost:8080/ShoppingAndManager_Web_exploded/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleFileChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form>
          <div className='plus_info'>
                <Select
                    defaultValue={'选择类型'}
                    onChange={handleChange}
                    className='plus_ipt'
                >
                    <Option value="menwear">男装</Option>
                    <Option value="dress">女装</Option>
                    <Option value="childrenwear">童装</Option>
                    <Option value="medicine">医疗</Option>
                    <Option value="cosmetics">美妆</Option>                  
                    <Option value="phone">手机</Option>
                </Select>
                <Input size="large" placeholder="输入描述信息" prefix={<UserOutlined />} className='plus_ipt' onChange={(e)=>setDes(()=>e.target.value)}/>
                <Input size="large" placeholder="输入图片url" prefix={<PictureOutlined/>} className='plus_ipt' onChange={(e)=>setUrl(()=>e.target.value)}/>
                <Input size="large" placeholder="输入价格信息" prefix={<PayCircleOutlined/>} className='plus_ipt' onChange={(e)=>setPri(()=>e.target.value)} required/>
                <Button className='plus_button' style={{width:'25%'}} onClick={submit}>提交</Button>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
    );
}

export default Plus;
