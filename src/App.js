import React from 'react';
import { useRoutes } from 'react-router-dom';
import route from './route/routes'
import 'antd/dist/antd.min.css';
import './App.css';

function App() {
  const element=useRoutes(route);
  return (
    <div className="App">  
      {element}
    </div>
  );
}

export default App;
