import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, Button
} from 'reactstrap';
import ProjectList from './ProjectList';

const mockProjectList = {
  1: {
    id: '1',
    name: 'I am super long project name in order to break markdown',
    description: 'I am super much more longer project description in order to break markdown'
  },
  2: { id: '2', name: 'WorIld' },
  3: {
    id: '3',
    name: 'I am super long project name in order to break markdown',
    description: 'I am super much more longer project description in order to break markdown'
  }
};

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
        <ProjectList activeProjectId="2" projects={mockProjectList} />
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
