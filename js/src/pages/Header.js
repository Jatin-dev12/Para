import React  from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button} from 'react-bootstrap';
import '../../src/App.css';

import Logo from './logo.png'


function Header() {
    
    
  return (
    
    <Navbar bg="primary" data-bs-theme="dark">
    <Container fluid>
      
    <Navbar.Brand href="#home">
    <img
              src={Logo}
              width="60%"
    
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />


          </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">   
        <Button variant="light" href='#'>Connect Wallet</Button>
          
       

    
              </Nav>
         </Navbar.Collapse>
            
    </Container>
  </Navbar>


  );
}

export default Header;