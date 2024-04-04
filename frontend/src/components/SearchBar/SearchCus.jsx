import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerSearch() {
    const [nic, setNic] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/customers/searchByNIC/${nic}`);
            const customer = response.data.customer;
            if (customer) {
                // Construct the address string
                const address = `${customer.no}, ${customer.street1}, ${customer.street2}, ${customer.city}`;
                // Show customer data in an alert
                alert(`Customer found:\nName: ${customer.fname} ${customer.lname}\nNIC: ${customer.nic}\nPhone: ${customer.phone}\nEmail: ${customer.email}\nAddress: ${address}`);
                // Navigate to UserProfile with NIC as a parameter
               
            } else {
              alert('no customer')
            }
        } catch (error) {
            console.error('Error searching for customer:', error);
            alert('no customer')
        }
    };

    return (
        <div>
            <input
                type="text"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                placeholder="Enter NIC"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default CustomerSearch;
