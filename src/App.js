import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/routes/Home';
import Starred from './components/routes/Starred';
import NotFoundRoute from './components/routes/NotFoundRoute';
import Show from './components/routes/Show';
import {ThemeProvider} from 'styled-components';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/starred' element={<Starred/>} />

        <Route  element={<NotFoundRoute/>} />

        <Route exact path="/show/:id" element={<Show/>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
