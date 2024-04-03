import axios from 'axios';
import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

// Your Firebase configuration
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

const Addfoods = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [food, setFood] = useState({
    foodname: '',
    price: '',
    description: '',
    imageUrl: '' // Updated to store image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'fimages/' + file.name);
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
            setFood({ ...food, imageUrl: downloadURL }); // Update food state with image URL
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
      if (!food.foodname || !food.price || !food.description || !food.imageUrl) {
        console.error('Please fill all fields');
        return;
      }

      // Save data to MongoDB
      await axios.post('http://localhost:8070/food/add', food);
      console.log('Food added successfully');

      // Reset form fields after successful submission
      setFood({
        foodname: '',
        price: '',
        description: '',
        imageUrl: ''
      });

      // Navigate to another page after submission
      navigate('/hfetch'); // Change '/hfetch' to the desired URL
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div>
        <h1>Add Food</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Food Name:
            <input
              type="text"
              name="foodname"
              value={food.foodname}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={food.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={food.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addfoods;
