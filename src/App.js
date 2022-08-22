import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/routes/Home';
import Starred from './components/routes/Starred';
import NotFoundRoute from './components/routes/NotFoundRoute';
import Show from './components/routes/Show';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/starred' element={<Starred/>} />

      <Route  element={<NotFoundRoute/>} />

      <Route exact path="/show/:id" element={<Show/>} />

    </Routes>
  );
}

export default App;
