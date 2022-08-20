import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/routes/Home';
import Starred from './components/routes/Starred';
import NotFoundRoute from './components/routes/NotFoundRoute';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/starred' element={<Starred/>}/>
      <Route element={<NotFoundRoute/>}/>
    </Routes>
  );
}

export default App;
