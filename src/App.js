import React, { useEffect, useState, useRef } from 'react';
import './styles/App.css';
import Calendar from './components/Calendar/Calendar';
import Carousel from './components/Carousel/Carousel'
function App() {

  useEffect(() => {

  })

  return (
    <div className="App">

      <div className='center'>
        <h1 className="title">Developing Calendar</h1>
        <Calendar />

      </div>
    </div>
  );
}

export default App;
