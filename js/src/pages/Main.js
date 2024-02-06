import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col ,Button, Container } from 'react-bootstrap';
import {PeraWalletConnect} from "@perawallet/connect"

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: false,
});




const Column = ({ children, width, jatin }) => {
  return (
    <div className={`column ${jatin && 'jatin'}`} style={{ width }}>
      {children}
    </div>
  );
};




const Main = () => {
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
    <>
    <div className="App">
      <Column  className="" width="75%" jatin>
      <h2 className='yup'>Stake BUY Tokens
</h2> 
<Container>
<Row>
        <Col sm><h3>Participating Pool
</h3> <p>Stake Your Buy Token and earn 8% APY
</p>  </Col>
        <Col sm></Col>
        <Col sm><Button onClick={handleConnectWalletClick} size="lg" className='chk'>
Stake Now</Button></Col>
      </Row>
    </Container>
      
      </Column>
      
           <Column width="25%">
        <h3 className='b'>Balance</h3>
        <p>Staked <span className='ss'>0</span></p>
        <p>Rewards<span className='ss'>0</span></p>
        <p>Total<span className='ss'></span></p>
        <p>Total Value<span className='ss'>$0</span></p>
      </Column>
    </div>
    <div>
      
  
      <Col><h3 className='stake'>My Stakes</h3></Col>
      
    </div>

    
    
  
    </>
  );
};

export default Main;
