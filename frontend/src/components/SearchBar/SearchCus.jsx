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
                // Navigate to ViewCus with searchedCustomer as state
                navigate(`/searchByNIC/${nic}`, { state: { searchedCustomer: customer } });
            } else {
                setError('Customer not found');
            }
        } catch (error) {
            console.error('Error searching for customer:', error);
            setError('Error searching for customer');
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
