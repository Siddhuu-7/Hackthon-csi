import Homepage from './pages/Home';
import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" onComplete={() => setLoading(false)} />
          ) : (
            <Routes>
              <Route element={<Homepage />} path='/' />
            </Routes>
          )}
        </AnimatePresence>
      </AuthProvider>
    </BrowserRouter>
  )
}

