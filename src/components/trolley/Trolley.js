import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MyTable from './myTable/MyTable';

const Trolley = () => {
    const user=useSelector((state)=>state.user.value);
    const {state}=useLocation();
    const u=state.user;

    const dispatch=useDispatch();
 
    // const getUserTrolleyTest=()=>{
    //   // tNavigate('/trolley/empty',{replace:true});
    //   tNavigate('/trolley/show',{replace:true});
    // }
    return(
      <div>
        <MyTable user={u}/>
      </div>
    )
    
}

export default Trolley;
