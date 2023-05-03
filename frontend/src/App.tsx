import React from 'react';
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom"

import { HomePage } from './pages/HomePage/HomePage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage'
import { ResetPasswordConfirmPage } from './pages/ResetPasswordConfirm/ResetPasswordConfirmPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { AdminPage } from './pages/AdminPage/AdminPage'
import { PostPage } from './pages/PostPage/PostPage'
import { ActivateUserPage } from './pages/ActivateUser/ActivateUserPage'
import { ResetPasswordSendPage } from './pages/ResetPasswordSend/ResetPasswordSendPage';

import './styles/globals.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/registration' element={<RegistrationPage />}/>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/reset/confirm/:uid/:token' element={<ResetPasswordConfirmPage />}/>
            <Route path='/reset' element={<ResetPasswordSendPage />}/>
            <Route path='/activate/:uid/:token' element={<ActivateUserPage />} />
            <Route path='/admin' element={<AdminPage />}/>
            <Route path='/post/:id' element={<PostPage />}/>
            <Route path='*' element={<HomePage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
