import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAarwFcpYIKj1T7Hb2yIOMNiDP5Hp-ezFc",
  authDomain: "vitefood-72ee6.firebaseapp.com",
  projectId: "vitefood-72ee6",
  storageBucket: "vitefood-72ee6.appspot.com",
  messagingSenderId: "117616991639",
  appId: "1:117616991639:web:db446386bd507c21f838d2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const Addcustomer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [customer, setCustomer] = useState({
    fname: '',
    lname: '',
    nic: '',
    phone: '',
    email: '',
    no: '',
    street1: '',
    street2: '',
    city: '',
    imageUrl: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'cimages/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress if needed
        },
        (error) => {
          console.error('Error uploading image to Firebase:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('DownloadURL:', downloadURL);
            setCustomer({ ...customer, imageUrl: downloadURL }); // Update food state with image URL
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if all fields are filled
      if (!customer.fname || !customer.lname || !customer.nic || !customer.phone || !customer.email || !customer.no || !customer.street1 || !customer.street2 || !customer.city || !customer.imageUrl || !customer.password || !customer.confirmPassword) {
        console.error('Please fill all fields');
        return;
      }

      // Save data to MongoDB
      await axios.post('http://localhost:8070/customers/register', customer);
      console.log('customer added successfully');

      setCustomer({
        fname: '',
        lname: '',
        nic: '',
        phone: '',
        email: '',
        no: '',
        street1: '',
        street2: '',
        city: '',
        imageUrl: '',
        password: '',
        confirmPassword: '',
      });
      // Navigate to another page after submission
      navigate('/hfetch'); // Change '/hfetch' to the desired URL
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <div className="body">
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <form method="POST" onSubmit={handleSubmit}>
            <center><h1 style={{ color: "black", backgroundColor: "white" }}>Register</h1></center>
            <div className="form1">
              <div className="input-group">
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  title="Enter only letters"
                  required
                  placeholder="Enter First Name"
                  value={customer.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="lname"
                  name="lname"
                  title="Enter only letters"
                  required
                  placeholder="Enter Last Name"
                  value={customer.lname}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="nic"
                  name="nic"
                  pattern="^(?:\d{12}|\d{12}[Vv])$"
                  title="Enter exactly 12 numbers or 12 numbers followed by 'V'/'v'"
                  required
                  placeholder="Enter NIC No"
                  value={customer.nic}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>
                  Upload Image:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="input-group1">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength="10"
                  placeholder="Enter phone No"
                  title="Enter a number that starts with 0 and has 9 additional digits"
                  required
                  value={customer.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  title="Enter a valid email address"
                  required
                  value={customer.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="no"
                  name="no"
                  placeholder="Address No"
                  required
                  value={customer.no}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="street1"
                  name="street1"
                  placeholder="Street/city"
                  required
                  value={customer.street1}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="street2"
                  name="street2"
                  placeholder="Street/city"
                  required
                  value={customer.street2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <select
              id="city"
              name="city"
              required
              value={customer.city}
              onChange={handleChange}
            >
              <option value="" disabled>Select City</option>
              <option value="AM">Ampara</option>
              <option value="AD">Anuradhapura</option>
              <option value="BD">Badulla</option>
              <option value="BT">Batticaloa</option>
              <option value="CB">Colombo</option>
              <option value="GL">Galle</option>
              <option value="GP">Gampaha</option>
              <option value="HB">Hambantota</option>
              <option value="JA">Jaffna</option>
              <option value="KT">Kalutara</option>
              <option value="KD">Kandy</option>
              <option value="KG">Kegalle</option>
              <option value="KL">Kilinochchi</option>
              <option value="KR">Kurunegala</option>
              <option value="MN">Mannar</option>
              <option value="MT">Matale</option>
              <option value="MA">Matara</option>
              <option value="MG">Monaragala</option>
              <option value="ML">Mullaitivu</option>
              <option value="NE">Nuwara Eliya</option>
              <option value="PL">Polonnaruwa</option>
              <option value="PT">Puttalam</option>
              <option value="RT">Ratnapura</option>
              <option value="TC">Trincomalee</option>
              <option value="VA">Vavuniya</option>
            </select>
            <div className="password-fields">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                minLength="8"
                required
                value={customer.password}
                onChange={handleChange}
              />
              {customer.password && (customer.password.length < 8 || /^[a-zA-Z]*$/.test(customer.password) || /^[0-9]*$/.test(customer.password)) && (
                <p className="password-strength">Weak Password</p>
              )}
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                minLength="8"
                required
                value={customer.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="sub">
              <button type="submit" className="red-button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addcustomer;
