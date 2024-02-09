import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col ,Button, Container } from 'react-bootstrap';
import {PeraWalletConnect} from "@perawallet/connect"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import Dow from './download.png'


const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: false,
  AlgorandChainIDs: "416001 , 416002"
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
  const [isConnected, setIsConnected] = useState(false);
  const [buyAmount, setBuyAmount] = useState(0);
  const [algoAmount, setAlgoAmount] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnect);

      if (peraWallet.isConnected && accounts.length) {
        setAccountAddress(accounts[0]);
        setIsConnected(true);
      }
    })
    const storedAccountAddress = localStorage.getItem('accountAddress');
    if (storedAccountAddress) {
      setAccountAddress(storedAccountAddress);
      setIsConnected(true);
    }

    return () => {
      peraWallet.connector?.off ('disconnect', handleDisconnect);
    };
  }, []);

  const handleWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      peraWallet.connector?.off("disconnect", handleDisconnect);
      setAccountAddress(accounts[0]);
      localStorage.setItem("accountAddress", accounts[0]);
      console.log(accounts)

      const assets = await peraWallet.getAssets();
      const algoAsset = assets.find((asset) => asset.name === "ALGO");
      const algoAmount = await peraWallet.getAssetAmount(accounts, algoAsset.asset_id);
      setAlgoAmount(algoAmount);
      console.log("algoamount")

      const buyAsset = await peraWallet.getToken("buy"); // Fetch BUY token object
      const buyAssetId = buyAsset.asset_id; // Get the asset ID for the BUY token
      const buyAmount = await peraWallet.getAssetAmount(accounts, buyAssetId);
      setBuyAmount(buyAmount);
    } catch (error) {
      if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
        setError(error);
        console.error(error);
      }
    }
  };

  const handleDisconnect = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
    setIsConnected(false);
    localStorage.removeItem('accountAddress');
  };

  const handleConnectWalletClick = () => {
    if (isConnected) {
      handleDisconnect();
    } else {
      handleWallet();
    }
  };


  return (
    <>
      <div className="App">
        <Column className="" width="75%" jatin>
          {accountAddress && (
            <p className="box-shadow">
             <FontAwesomeIcon icon={faWallet} /> Wallet Address: {accountAddress.substring(0, 10)}...{accountAddress.slice(-10)}
              <span>
                <button onClick={handleDisconnect} className="lll">
                  DISCONNECTS
                </button>
              </span>
              <span className="amount-label">BUY:{buyAmount}</span>
              <span className="amount-label"> <img src={Dow}></img> Algo:{algoAmount}</span>
        
        
            </p>
          )}

          <h2 className="yup">Stake BUY Tokens</h2>
          <Container>
            <Row>
              <Col sm>
                <h3>Participating Pool</h3>
                <p>Stake Your Buy Token and earn 8% APY</p>
              </Col>
              <Col sm></Col>
              <Col sm>
                <Button onClick={handleWallet} size="lg" className="chk">
                  Stake Now
                </Button>
              </Col>
            </Row>
          </Container>
        </Column>

        <Column width="25%">
          <h3 className="b">Balance</h3>
          <p>Staked <span className="ss">0</span></p>
          <p>Rewards<span className="ss">0</span></p>
          <p>Total<span className="ss"></span></p>
          <p>Total Value<span className="ss">$0</span></p>
        </Column>
      </div>

      <div>
        <Col>
          <h3 className="stake">My Stakes</h3>
        </Col>
      </div>
    </>
  );
};

export default Main;




// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import { Row, Col ,Button, Container } from 'react-bootstrap';
// import {PeraWalletConnect} from "@perawallet/connect"
// import { useNavigate } from "react-router-dom";
// import Header from './Header'





// const peraWallet = new PeraWalletConnect({
//   shouldShowSignTxnToast: false,
// });




// const Column = ({ children, width, jatin }) => {
//   return (
//     <div className={`column ${jatin && 'jatin'}`} style={{ width }}>
//       {children}
//     </div>
//   );
// };




// const Main = () => {
//   const navigate = useNavigate();

  
//   const [accountAddress, setAccountAddress] = useState(null);
//   useEffect(() => {
//     return () => {
//       peraWallet.connector?.off('disconnect', handleDisconnect);
//     };
//   }, []);
//   const handleConnect = async () => {
//     try {
//       const accounts = await peraWallet.connect();
//       peraWallet.connector?.on('disconnect', handleDisconnect);
//       setAccountAddress(accounts[0]);
//     } catch (error) {
//       if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
//         console.error(error);
//       }
//     }
//   };
//   const handleDisconnect = () => {
//     peraWallet.disconnect();
//     setAccountAddress(null);
//   };

//   const handleConnectWalletClick = () => {
//     if (accountAddress) {
//       handleDisconnect();
//     } else {
//       handleConnect();
//     }
//   };
//   return (
//     <>
//     <div className="App">
//       <Column  className="" width="75%" jatin>
      
//       {accountAddress && (
//           <p className="box-shadow"> Wallet Address: {accountAddress.substring(0, 10)}...{accountAddress.slice(-10)} <span>
//           <button onClick={handleDisconnect} className='lll'>
//           DISCONNECTS
//         </button>
//          </span>
//          <span></span>
//          </p>
//           )}
        
        
//       <h2 className='yup'>Stake BUY Tokens
// </h2> 
// <Container>
// <Row>
//         <Col sm><h3>Participating Pool
// </h3> <p>Stake Your Buy Token and earn 8% APY
// </p>  </Col>
//         <Col sm></Col>
//         <Col sm><Button onClick={handleConnectWalletClick} size="lg" className='chk'>
// Stake Now</Button></Col>
//       </Row>
//     </Container>
      
//       </Column>
      
//            <Column width="25%">
//         <h3 className='b'>Balance</h3>
//         <p>Staked <span className='ss'>0</span></p>
//         <p>Rewards<span className='ss'>0</span></p>
//         <p>Total<span className='ss'></span></p>
//         <p>Total Value<span className='ss'>$0</span></p>
//       </Column>
//     </div>
//     <div>
      
  
//       <Col><h3 className='stake'>My Stakes</h3></Col>
      
//     </div>

    
    
  
//     </>
//   );
// };

// export default Main;   



// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import { Row, Col ,Button, Container } from 'react-bootstrap';
// import {PeraWalletConnect} from "@perawallet/connect"
// import { useNavigate } from "react-router-dom";
// import Header from './Header'





// const peraWallet = new PeraWalletConnect({
//   shouldShowSignTxnToast: false,
// });




// const Column = ({ children, width, jatin }) => {
//   return (
//     <div className={`column ${jatin && 'jatin'}`} style={{ width }}>
//       {children}
//     </div>
//   );
// };




// const Main = () => {
//   const navigate = useNavigate();

  
//   const [accountAddress, setAccountAddress] = useState(null);
//   useEffect(() => {
//     return () => {
//       peraWallet.connector?.off('disconnect', handleDisconnect);
//     };
//   }, []);
//   const handleConnect = async () => {
//     try {
//       const accounts = await peraWallet.connect();
//       peraWallet.connector?.on('disconnect', handleDisconnect);
//       setAccountAddress(accounts[0]);
//     } catch (error) {
//       if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
//         console.error(error);
//       }
//     }
//   };
//   const handleDisconnect = () => {
//     peraWallet.disconnect();
//     setAccountAddress(null);
//   };

//   const handleConnectWalletClick = () => {
//     if (accountAddress) {
//       handleDisconnect();
//     } else {
//       handleConnect();
//     }
//   };
//   return (
//     <>
//     <div className="App">
//       <Column  className="" width="75%" jatin>
      
//       {accountAddress && (
//           <p className="box-shadow"> Wallet Address: {accountAddress.substring(0, 10)}...{accountAddress.slice(-10)} <span>
//           <button onClick={handleDisconnect} className='lll'>
//           DISCONNECTS
//         </button>
//          </span>
//          <span></span>
//          </p>
//           )}
        
        
//       <h2 className='yup'>Stake BUY Tokens
// </h2> 
// <Container>
// <Row>
//         <Col sm><h3>Participating Pool
// </h3> <p>Stake Your Buy Token and earn 8% APY
// </p>  </Col>
//         <Col sm></Col>
//         <Col sm><Button onClick={handleConnectWalletClick} size="lg" className='chk'>
// Stake Now</Button></Col>
//       </Row>
//     </Container>
      
//       </Column>
      
//            <Column width="25%">
//         <h3 className='b'>Balance</h3>
//         <p>Staked <span className='ss'>0</span></p>
//         <p>Rewards<span className='ss'>0</span></p>
//         <p>Total<span className='ss'></span></p>
//         <p>Total Value<span className='ss'>$0</span></p>
//       </Column>
//     </div>
//     <div>
      
  
//       <Col><h3 className='stake'>My Stakes</h3></Col>
      
//     </div>

    
    
  
//     </>
//   );
// };

// export default Main;
