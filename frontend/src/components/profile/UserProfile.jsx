import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const loggedInUserNIC = localStorage.getItem('loggedInUserNIC'); // Get logged-in user NIC from localStorage
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                if (!loggedInUserNIC) {
                    // If user is not logged in, stop loading and navigate to login page
                    setLoading(false);
                    navigate('/loginCus');
                    return;
                }

                console.log("Fetching user details for NIC:", loggedInUserNIC);
                const response = await axios.get(`http://localhost:8070/customers/getUser/${loggedInUserNIC}`);
                console.log("User details response:", response.data);
                const { status, customer } = response.data;

                if (status === "Customer fetched") {
                    setUserDetails(customer);
                } else {
                    console.error(`Error: ${status}`);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        }
        fetchUserProfile();
    }, [loggedInUserNIC, navigate]); // Include loggedInUserNIC and navigate in the dependency array

    useEffect(() => {
        // Check if the user details are deleted from local storage
        if (!loggedInUserNIC) {
            setLoading(false);
            setUserDetails(null);
        }
    }, [loggedInUserNIC]);

    const handleEditProfile = () => {
        navigate(`/updateCus/${loggedInUserNIC}`);
    };

  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userDetails) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <div className="user-details">
                <p><strong>First Name:</strong> {userDetails.fname}</p>
                <p><strong>Last Name:</strong> {userDetails.lname}</p>
                <p><strong>NIC:</strong> {userDetails.nic}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>No:</strong> {userDetails.no}</p>
                <p><strong>Street 1:</strong> {userDetails.street1}</p>
                <p><strong>Street 2:</strong> {userDetails.street2}</p>
                <p><strong>City:</strong> {userDetails.city}</p>
                {userDetails.imageUrl && (
                    <div>
                        <p><strong>Profile Image:</strong></p>
                        <img src={userDetails.imageUrl} alt="Profile" className="profile-image" />
                    </div>
                )}
                <div className="editbutton">
                    <button onClick={handleEditProfile}>Edit Profile</button>
                  
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
