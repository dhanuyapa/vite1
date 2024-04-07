import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
  width: 100%;
  height: 75px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 px;
  display: flex;
  justify-content: space-between;
  background-color: #e9e989;
  
  position: relative;
  z-index: 100;

  @media screen and (max-width: 768px) {
    .burger-menu {
      position: absolute;
      top: 55px;
      right: 20px;
    }
  }
`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        {/* Your logo content here */}
      </div>
      <div className="burger-menu">
        <Burger />
      </div>
    </Nav>
  )
}

export default Navbar;
