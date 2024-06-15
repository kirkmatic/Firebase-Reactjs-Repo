import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Crud from './Crud';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './authentications/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home-page" element={<HomePage />} />
        <Route path='/login-page' element={<LoginPage/>} />
        <Route path="/signup-page" element={<SignupPage />} />
        <Route 
          path="/crud" 
          element={
            <ProtectedRoute>
              <Crud />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
