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
import ViewCus from './components/ViewCustomer/ViewCus';
import Home from './components/Home/Home';
import ContactUs from './components/Contact Us/ContactUs';
import AddCart from './components/AddCart/AddCart';
import Total from './components/AddCart/Total';
import AboutUs from './components/AboutUs/AboutUs';
import MapRoute from './components/map/map';



import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} /> {/* Display Home component by default */}
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/AboutUs" element={<AboutUs/>} /> {/* Display Home component by default */}
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
          <Route path="/searchByNIC/:nic" element={<ViewCus/>} />

          <Route path="/addItem/:nic/:foodId" element={<AddCart/>} />
          <Route path="/addItem/:nic/:foodId" element={<Total/>} /> 
          <Route path="/map" element={<MapRoute />} /> {/* Corrected this line */}
   
          

    

        </Routes>
      </div>
    </Router>
  );
}

export default App;
