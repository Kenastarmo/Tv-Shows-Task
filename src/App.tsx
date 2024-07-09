import React from 'react'

// import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import {MoviesProvider} from './context/MoviesProvider.tsx';
import Details from './pages/Details/Details.tsx'
import Home from '../src/pages/Home/Home'


function App() {




  return (
    
    <MoviesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
      </Router>
    </MoviesProvider>
  )
}

export default App
