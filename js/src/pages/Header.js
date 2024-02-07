import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button} from 'react-bootstrap';
import '../../src/App.css';
import {PeraWalletConnect} from "@perawallet/connect"
import Logo from './logo.png'
import { useNavigate } from 'react-router-dom';


const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: false,
});


function Header() {
  const [accountAddress, setAccountAddress] = useState(null);
  useEffect(() => {
    return () => {
      peraWallet.connector?.off('disconnect', handleDisconnect);
    };
  }, []);
  const handleConnect = async () => {
    try {
      const accounts = await peraWallet.connect();
      peraWallet.connector?.on('disconnect', handleDisconnect);
      setAccountAddress(accounts[0]);
    } catch (error) {
      if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
        console.error(error);
      }
    }
  };
  const handleDisconnect = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
  };

  const handleConnectWalletClick = () => {
    if (accountAddress) {
      handleDisconnect();
    } else {
      handleConnect();
    }
  };
    
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
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/pera">Pera</Nav.Link>
        <Button onClick={handleConnectWalletClick}  variant="light" >Connect Wallet</Button>
          
       

    
              </Nav>
         </Navbar.Collapse>
            
    </Container>
  </Navbar>


  );
}

export default Header;