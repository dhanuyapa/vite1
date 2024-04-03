import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchCus() {
  const [nic, setNic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8070/searchC?nic=${nic}`);
      const foundCustomers = response.data;

      if (foundCustomers.length > 0) {
        // Navigate to the first found customer's details page
        navigate(`/getUser/${nic}`);
      } else {
        // Show alert if no customers found
        alert(`No customers found with NIC '${nic}'.`);
      }
    } catch (error) {
      console.error('Error searching for customers:', error);
      setError('An error occurred while searching for customers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        placeholder="Enter NIC number"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SearchCus;
