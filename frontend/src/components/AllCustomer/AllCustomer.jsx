import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCus from '../SearchBar/SearchCus';


function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get('http://localhost:8070/customers/fetchc');
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h2>All Customers</h2>
    <SearchCus />
    
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>NIC</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Address</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td>{customer.fname}</td>
            <td>{customer.lname}</td>
            <td>{customer.nic}</td>
            <td>{customer.phone}</td>
            <td>{customer.email}</td>
            <td>{`${customer.no}, ${customer.street1}, ${customer.street2 ? customer.street2 + ',' : ''} ${customer.city}`}</td>
            <td><img src={customer.imageUrl} alt="Customer" style={{ maxWidth: '200px' }} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default AllCustomers;
