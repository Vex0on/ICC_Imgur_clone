import React from 'react';
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom"

import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { ResetPasswordPage } from './pages/ResetPassword/ResetPasswordPage';

import './styles/globals.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/registration' element={<RegistrationPage />}/>
            <Route path='/reset' element={<ResetPasswordPage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
