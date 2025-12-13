
import Homepage from './pages/Home';
import Regestration from "./pages/RegestrationPage"
import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter >
    <Routes >
      <Route element={<Homepage/>} path='/'/>
      <Route element={<Regestration/>} path='/regestration'/>
    </Routes>
    </BrowserRouter>
  )
}
