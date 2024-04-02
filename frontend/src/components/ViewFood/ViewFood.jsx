import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function ViewFood() {
    const { id } = useParams(); // Get the ID parameter from the URL
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFood() {
            try {
                const response = await axios.get(`http://localhost:8070/food/fetch/${id}`);
                setFood(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching food:', error);
                setLoading(false);
            }
        }
        fetchFood();
    }, [id]); // Include id in the dependency array to re-fetch data when the ID changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!food) {
        return <div>Food not found</div>;
    }

    return (
        
        <div>
           
            <h2>View Food</h2>
            <div key={food._id}>
                <h3>{food.foodname}</h3>
                <p>Price: {food.price}</p>
                <p>Description: {food.description}</p>
                <img
                    src={food.imageUrl}
                    alt={food.foodname}
                    className="food-image"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                    onError={(e) => console.error('Error loading image:', e)}
                />
            </div>
        </div>
    );
}

export default ViewFood;
