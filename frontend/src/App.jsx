import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Addcustomer from './components/Addcustomer/Addcustomer';
import Login from './components/Login/Login';
import UserProfile from './components/profile/UserProfile';
import EditProfile from "./components/Edit/EditProfile";
import AddFood from './components/Addfood/AddFood';
import AllFoods from './components/AllFoods/AllFoods';

import ViewFood from './components/ViewFood/ViewFood';
import EditAllFood from './components/AdminFood/EditAllFood';
import EditFood from './components/AdminFood/EditFood';
import AllCustomer from './components/AllCustomer/AllCustomer';




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
          <Route path="/add" element={<AddFood />} />
          <Route path="/fetch" element={<AllFoods/>} />
          <Route path="/fetch/:id" element={<ViewFood/>} />
          <Route path="/hfetch" element={<EditAllFood/>} />
          <Route path="/edit/:id" element={<EditFood/>} />
          <Route path="/fetchc" element={<AllCustomer/>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;

