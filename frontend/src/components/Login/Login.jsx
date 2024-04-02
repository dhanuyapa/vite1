import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load saved NIC and password from local storage
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    if (savedData) {
      setNic(savedData.nic || '');
      setPassword(savedData.password || '');
    }
  }, []);

  const handleNicChange = (e) => {
    setNic(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to the backend for user login
      const response = await axios.post('http://localhost:8070/customers/loginCus', { nic, password });

      if (response.status === 200) {
        // Save the logged-in user's NIC to local storage
        localStorage.setItem('loggedInUserNIC', nic);
        setNic("");
        setPassword("");
        setLoginSuccess(true);
        
        // Check if NIC and password match the condition
        if (nic === '888888888888' && password === '88888888@') {
          navigate('/add'); // Navigate to hfetch page
        } else {
          navigate('/getUser/:nic'); // Navigate to AllCus page for other users
        }
      } else {
        alert('Invalid NIC or password');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid NIC or password');
      } else {
        console.error('An error occurred', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <div className="form">
        <center><h1>Login</h1></center>
        <br></br>
        {loginSuccess ? (
          <p className="success-message-yapa">Login successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group-yapa1">
              <input
                type="text"
                id="nic"
                placeholder="Enter NIC"
                name="nic"
                value={nic}
                onChange={handleNicChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-group-yapa1">
              <input
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'} // Toggle password visibility based on state
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="off"
              />
              {/* Toggle visibility icon */}
              {showPassword ? (
                <VisibilityIcon  onClick={togglePasswordVisibility} />
              ) : (
                <VisibilityOffIcon onClick={togglePasswordVisibility} />
              )}
            </div>
            <div className="form-group-yapa2">
              <button type="submit" className="red-button">Login</button>
            </div>
            <p className="signup-message-yapa">
              Haven't an account?{' '}
            </p>
            <center>
              <Link to="/register" className="signup-link-yapa">
                Sign up
              </Link>
            </center>
          </form>
        )}
        {errorMessage && <p className="error-message-yapa">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
