import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../Header/AdminHeader';

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({
    foodname: '',
    price: '',
    description: '',
    imageUrl: ''
  });
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
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/food/fetch/${id}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

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
            setFood({ ...food, imageUrl: downloadURL });
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
      await axios.put(`http://localhost:8070/food/edit/${id}`, food);
      console.log('Food updated successfully');
      navigate('/hfetch'); // Navigate to desired page
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this food?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:8070/food/deleteFood/${id}`);
        console.log('Food deleted successfully');
        navigate('/hfetch'); // Navigate to desired page
      }
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <h1>Edit Food</h1>
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
          Upload New Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <br />
        {food.imageUrl && (
          <div>
            <h3>Current Image:</h3>
            <img src={food.imageUrl} alt="Food" style={{ maxWidth: '200px' }} />
          </div>
        )}
        <br />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleDelete}>Delete Food</button>
      </form>
    </div>
  );
};

export default EditFood;
