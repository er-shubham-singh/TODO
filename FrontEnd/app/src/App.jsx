import React from 'react';
import './App.css';
import RegisterForm from './Component/RegisterForm';
import LoginForm from './Component/LoginForm';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import CheckLogin from './Component/CheckLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path='/dashboard'element={
        <CheckLogin>
        <Dashboard />
        </CheckLogin>
        }
         />
    </Routes>
  );
}

export default App;

