import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const EditProfile = () => {
  const { nic } = useParams(); // Get NIC from URL params
  const navigate = useNavigate(); // Initialize useNavigate hook
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

  // Initialize Firebase app
 
const firebaseConfig = {
  apiKey: "AIzaSyAarwFcpYIKj1T7Hb2yIOMNiDP5Hp-ezFc",
  authDomain: "vitefood-72ee6.firebaseapp.com",
  projectId: "vitefood-72ee6",
  storageBucket: "vitefood-72ee6.appspot.com",
  messagingSenderId: "117616991639",
  appId: "1:117616991639:web:db446386bd507c21f838d2"
};
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        console.log("Fetching user details for NIC:", nic);
        const response = await axios.get(`http://localhost:8070/customers/getUser/${nic}`);
        console.log("User details response:", response.data);
        const { status, customer } = response.data;

        if (status === "Customer fetched") {
          setCustomer(customer);
        } else {
          console.error(`Error: ${status}`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchUserProfile();
  }, [nic]);

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
            setCustomer({ ...customer, imageUrl: downloadURL }); // Update customer state with image URL
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
      if (!customer.fname || !customer.lname || !customer.phone || !customer.email || !customer.no || !customer.street1 || !customer.street2 || !customer.city || !customer.imageUrl || !customer.password || !customer.confirmPassword) {
        console.error('Please fill all fields');
        return;
      }

      // Update customer data
      await axios.put(`http://localhost:8070/customers/updateCus/${nic}`, customer);
      console.log('Customer updated successfully');
      alert('Customer updated successfully');

      // Navigate to another page after submission
      navigate(`/getUser/${nic}`); // Redirect to the user profile page
    } catch (error) {
      console.log('Error updating customer:', error);
      alert('Error updating customer:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" value={customer.fname} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="lname">Last Name:</label>
          <input type="text" id="lname" name="lname" value={customer.lname} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={customer.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={customer.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="no">Address No:</label>
          <input type="text" id="no" name="no" value={customer.no} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="street1">Street 1:</label>
          <input type="text" id="street1" name="street1" value={customer.street1} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="street2">Street 2:</label>
          <input type="text" id="street2" name="street2" value={customer.street2} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <select id="city" name="city" value={customer.city} onChange={handleChange} required>
            <option value="">Select City</option>
            <option value="Ampara">Ampara</option>
            <option value="Anuradhapura">Anuradhapura</option>
            {/* Add other city options */}
          </select>
        </div>
        <div>
          <label>
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={customer.password} onChange={handleChange} minLength="8" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={customer.confirmPassword} onChange={handleChange} minLength="8" required />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
