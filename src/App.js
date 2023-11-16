import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './components/Start/Start';
import Quote from './components/Quote/Quote';
import PlayAgainBoard from './components/Board/PlayAgainBoard';

const App = () => {
  return (
    <>
      <Quote/>
      <Routes>
      <Route path="/"  element={<Start/>} />
      <Route path="/play-again" element={<PlayAgainBoard/>} />
      </Routes>
      </>
  
  )
}

export default App
