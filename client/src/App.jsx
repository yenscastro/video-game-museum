import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Locations from './pages/Locations'
import Location from './pages/Location'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path="/locations/:id" element={<Location />} />
      </Routes>
    </div>
  )
}

export default App