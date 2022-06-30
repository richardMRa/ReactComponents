import React, { useEffect, useState, useRef } from 'react';
import './styles/App.css';
import Calendar from './components/Calendar/Calendar';
import Carousel from './components/Carousel/Carousel'
function App() {
  const containerRef = useRef(null)
  useEffect(() => {

  })

  return (
    <div className="App">
      <h1 className="title">Developing Calendar</h1>
      <div className='center' ref={containerRef}>  
        <Calendar exitEventRef={containerRef} />
      </div>
    </div>
  );
}

export default App;
