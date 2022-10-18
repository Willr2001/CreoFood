import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './components/Favorites';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
