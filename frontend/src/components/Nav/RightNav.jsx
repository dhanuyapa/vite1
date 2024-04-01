import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
    if (loggedInUserNIC) {
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      navigate('/loginCus');
    }
  };

  return (
    <Ul open={open}>
      <li><Link to="/getUser/:nic" onClick={handleProfileClick}>Profile</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/loginCus">Sign In</Link></li>
      <li><Link to="/register">Sign Up</Link></li>
    </Ul>
  );
}

export default RightNav;
