import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Addcustomer from './components/Addcustomer/Addcustomer';
import Login from './components/Login/Login';
import UserProfile from './components/profile/UserProfile';
import EditProfile from "./components/Edit/EditProfile";

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Addcustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/updateCus/:nic" element={<EditProfile />} /> {/* Removed the extra space */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

