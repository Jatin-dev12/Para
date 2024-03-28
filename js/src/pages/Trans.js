import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from 'algosdk';

const peraWallet = new PeraWalletConnect({
  clientMeta: {
    description: 'Pera Wallet',
    url: 'https://pera.io',
    icons: ['https://pera.io/favicon.ico'],
    name: 'Pera Wallet',
  },
});

const Trans = () => {
  const [show, setShow] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [algoBalance, setAlgoBalance] = useState(0);
  const [buyTokenBalance, setBuyTokenBalance] = useState(0);
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [amount, setAmount] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConnect = (error, payload) => {
    if (error) {
      throw error;
    }

    const { accounts } = payload.params[0];
    setAddress(accounts[0]);
    setConnected(true);
  };

  const handleDisconnect = () => {
    setConnected(false);
    setAddress('');
    setAlgoBalance(0);
    setBuyTokenBalance(0);
    setStaked(0);
    setRewards(0);
    setTotal(0);
    setTotalValue(0);
  };

  useEffect(() => {
    const handleConnectEvent = (error, payload) => {
      handleConnect(error, payload);
    };

    const handleDisconnectEvent = () => {
      handleDisconnect();
    };

    peraWallet.connector?.on('connect', handleConnectEvent);
    peraWallet.connector?.on('disconnect', handleDisconnectEvent);

    return () => {
      peraWallet.connector?.off('connect', handleConnectEvent);
      peraWallet.connector?.off('disconnect', handleDisconnectEvent);
    };
  }, []);

  const handleWallet = async () => {
    if (connected) {
      handleDisconnect();
    } else {
      peraWallet.reconnectSession();
    }
  };

  const handleStake = async (amount: Number) => {
    if (!connected) {
      alert('Please connect your Pera Wallet');
      return;
    }

    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const algodClient = new algosdk.Algodv2(
      { 'X-API-Key': 'YOUR_API_KEY' },
      'https://testnet-algorand.api.purestake.io/ps2',
      'testnet'
    );

    const params = await algodClient.getTransactionParams().do();
    const fromAddress = address;
    const toAddress = 'ICKZ26QPEM7MXT6VDUKRAOHLTG4AMMD3FHDR7IGDKRAMN6IN7CHTYEWOY4';
    const assetId = 123456; // Replace with your asset ID
    const decimals = 6; // Replace with your asset decimals

    const amountToSend = Math.floor(amount * Math.pow(10, decimals));

    const note = new Uint8Array(0);

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: fromAddress,
      to: toAddress,
      amount: amountToSend,
      assetIndex: assetId,
      suggestedParams: params,
      note,
    });

    const signedTxn = await algosdk.signDigest(txn.toBuffer(), 'YOUR_PRIVATE_KEY');

    try {
      const txResponse = await algodClient.sendRawTransaction(signedTxn).do();
      console.log('Transaction ID:', txResponse.txId);

      setStaked(staked + amount);
      setTotal(total + amount);

      alert('Staking successful');
    } catch (error) {
      console.error('Error:', error);
      alert('Staking failed');
    }
  };

  return (
    <>
      <button onClick={handleShow}>Open modal</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal Content</Modal.Body>
        <Modal.Footer>
          <Form.Control
            className='ja'
            type="numeric"  
            placeholder="Enter Amount"
            autoFocus
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <Button variant="primary" onClick={() => handleStake(parseFloat(amount))}>
            Stake Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Trans;