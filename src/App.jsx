
import Homepage from './pages/Home';
import Regestration from "./pages/RegestrationPage"
import React from 'react'
import ProblemStatement from './pages/ProblemStatement';
import AuthPage from './pages/AuthPage';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Homepage/>} path='/'/>
          <Route element={<AuthPage/>} path='/auth'/>
          <Route 
            element={
              <ProtectedRoute>
                <Regestration/>
              </ProtectedRoute>
            } 
            path='/registration'
          />
          <Route element={<ProblemStatement/>} path='/statement'/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

