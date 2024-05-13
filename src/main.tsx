import React from 'react'
import { MoviesProvider } from './context/MoviesProvider.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Details from './pages/Details/Details.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  // <React.StrictMode>
  //   <MoviesProvider>
  //     <App />
  //   </MoviesProvider>
  // </React.StrictMode>


  <React.StrictMode>
    <MoviesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
      </Router>
    </MoviesProvider>
  </React.StrictMode>

)
