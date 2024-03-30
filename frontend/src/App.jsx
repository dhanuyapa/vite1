// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Addcustomer from './components/Addcustomer/Addcustomer';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Addcustomer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
