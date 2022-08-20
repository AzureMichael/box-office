import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Navs from './components/Navs';
import Home from './components/routes/Home';
import Starred from './components/routes/Starred';

function App() {
  return (
    <div>
    <Navs/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/starred' element={<Starred/>}/>
      <Route />
    </Routes>
    </div>
  );
}

export default App;
