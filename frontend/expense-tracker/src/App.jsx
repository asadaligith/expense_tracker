import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Login from './pages/Auth/Login';
import Home from './pages/dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Signup from './pages/Auth/signup';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/income" exact element={ <Income/>}/>
          <Route path="/expense" exact element={<Expense/>}/>
        </Routes>
      </Router>
      </div>
  )
}
export default App

const Root = ()=>{
  // Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    isAuthenticated ? (<Navigate to="/dashboard" />) : (<Navigate to="/login" />)
  );
};