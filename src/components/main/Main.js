import React, { useEffect } from 'react';
import {Outlet,useNavigate} from 'react-router-dom'



const Main = () => {
  const mNavigate=useNavigate();
  useEffect(() => {
    mNavigate('/home',{replace:true});
  }, []);
  return (
    <div className="App">  
      <Outlet/>
    </div>
    
  );

}
export default Main;