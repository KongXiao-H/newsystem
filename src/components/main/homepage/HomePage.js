import React ,{useState,useEffect }from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spin,BackTop, Divider} from 'antd';
import { nanoid } from 'nanoid';
import HeadNav from '../HeadNav/HeadNav';
import Out from '../Out/Out';
import CElement from '../CElement/CEelement'



const HomePage = () => {
    const [data, setData] = useState([]);
    const [page, setpage] = useState(1);


    /* 使用redux获取当前的用户，将用户的信息交给redux管理
     const user2=useSelector((state)=>state.user.value);
     const {state}=useLocation(); */
  
  //第一次进入时初始化数据
  useEffect(() => {
    fetchMoreData();
  }, []);

  //异步请求数据
   function fetchMoreData(){
    fetch(`http://localhost:8080/ShoppingAndManager_Web_exploded/loading?page=${page}`,
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
      let result=response.result;
      // console.log("re",typeof result);
      setData(()=>data.concat(Array.from(result)));
      setpage(()=>page+1);
    })
  }
    return (
        <div>
            <HeadNav/>
            <Out/>
            
            <InfiniteScroll
              dataLength={data.length}
              next={fetchMoreData}
              hasMore={data.length<270}
              style={{display:'flex',
                flexWrap:'wrap',
                margin:'auto',
                backgroundColor:'hsl(213, 15%, 95%)',//鱼肚白
                borderRadius: 18,
                width:'1200px',
                justifyContent:'space-between'}}
              loader={<Spin style={{margin:'auto'}}/>}
              endMessage={<Divider style={{fontSize:20 , margin:'auto'}}>没有更多商品</Divider>}
            >
            {
                data.map((val,index)=>(<CElement key={nanoid()} info={val}>{index}</CElement>))
            }
            </InfiniteScroll>
            
            <div className='test'>
              {/* <Link to='/shopping/1' state={{merId:1,table:'recommend'}}>点击携带信息跳转商品</Link> */}
            </div>
            <BackTop/>
        </div>
    );
}

export default HomePage;
