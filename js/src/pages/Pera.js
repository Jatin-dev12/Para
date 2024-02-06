import React, { useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { Button } from 'react-bootstrap';
import '../App.css';

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: false,
});

function Pera() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [scannerRunning, setScannerRunning] = useState(false);

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
    setScannerRunning(false);
  };

  const handleConnectWalletClick = () => {
    if (accountAddress) {
      handleDisconnect();
    } else {
      handleConnect();
    }
  };

  return (
    <div>
      <Button onClick={handleConnectWalletClick} className="wlt">
        {accountAddress ? 'Disconnect from Pera Wallet' : 'Connect to Pera Wallet'}
      </Button>
      {accountAddress && (
        <div>
          <div> Wallet Addres:  {accountAddress.substring(0, 10)}********{accountAddress.slice(-10)}
           <span>
            <button onClick={handleDisconnect} className='lll'>
            DISCONNECTS
          </button>
           </span>
           </div>
          
        </div>
      )}
    </div>
  );
}

export default Pera;