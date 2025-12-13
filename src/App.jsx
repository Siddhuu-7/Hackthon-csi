
import Homepage from './components/Home';
import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter >
    <Routes >
      <Route element={<Homepage/>} path='/'/>
    </Routes>
    </BrowserRouter>
  )
}
