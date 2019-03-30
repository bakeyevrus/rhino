import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Button
} from 'reactstrap';
import ProjectList from './ProjectList';

export function AppBar({ loggedIn }) {
  return (
    <Navbar color="dark" dark expand>
      <NavbarBrand href="https://github.com/bakeyevrus/rhino">rhino</NavbarBrand>
      {renderContent()}
    </Navbar>
  );

  function renderContent() {
    return loggedIn ? (
      <>
        <ProjectList />
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <NavItem className="ml-3">
            <Button color="success">Logout</Button>
          </NavItem>
        </Nav>
      </>
    ) : null;
  }
}

AppBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export default AppBar;
