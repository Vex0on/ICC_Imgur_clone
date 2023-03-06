import React from 'react';
import { HomePage } from './pages/HomePage/HomePage'
import {
  BrowserRouter as Router,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path='/' element={<HomePage />}/>
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
