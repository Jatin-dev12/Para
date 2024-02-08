import React, { useState, useEffect } from 'react';
import '../App.css';
import { Row, Col ,Button, Container } from 'react-bootstrap';
import {PeraWalletConnect} from "@perawallet/connect"
import Dow from './download.png'

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
  const [buyAmount, setBuyAmount] = useState(0);
  const [algoAmount, setAlgoAmount] = useState(0);
  const [error, setError] = useState();


  useEffect(() => {
    
    
    const storedAccountAddress = localStorage.getItem('accountAddress');
    if (storedAccountAddress) {
      setAccountAddress(storedAccountAddress);
    }

    return () => {
      peraWallet.connector?.off('disconnect', handleDisconnect);
    };
  }, []);
  
  const handleConnect = async () => {
    try {
      const accounts = await peraWallet.connect();
      peraWallet.connector?.on("disconnect", handleDisconnect);
      setAccountAddress(accounts[0]);
      localStorage.setItem("accountAddress", accounts[0]);
  
      const algoAmount = parseFloat(await peraWallet.getAssetAmount(accounts, "544646112"));
      setAlgoAmount(algoAmount);
  
      const buyAsset = await peraWallet.getToken("buy"); // BUY token object
      const buyAmount = parseFloat(await peraWallet.getAssetAmount(accounts, buyAsset.asset_id));
      setBuyAmount(buyAmount);
  
    } catch (error) {
      if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
        console.error(error);
      }
    }
  };
  
  // Add this useEffect hook to log the algoAmount state after it is updated
  useEffect(() => {
    console.log("Algo Amount:", algoAmount);
    console.log("Buy Amount :", buyAmount);
  }, [algoAmount]);

  // const handleConnect = async () => {
  //   try {
  //     const accounts = await peraWallet.connect();
  //     peraWallet.connector?.on('disconnect', handleDisconnect);
  //     setAccountAddress(accounts[0]);
  //     localStorage.setItem('accountAddress', accounts[0]);
  
  //     const assets = await peraWallet.getAssets();
  //     const algoAsset = assets.find(asset => asset.name === "ALGO");
  //     const algoAmount = await peraWallet.getAssetAmount(accounts, algoAsset.asset_id);
  //     setAlgoAmount(algoAmount);
  
  //     const buyAsset = await peraWallet.getToken("buy"); // BUY token object
  //     const buyAmount = await peraWallet.getAssetAmount(accounts, buyAsset.asset_id);
  //     setBuyAmount(buyAmount);

  //   } catch (error) {
  //     if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleDisconnect = () => {
    peraWallet.disconnect();
    setAccountAddress(null);
    localStorage.removeItem('accountAddress');
  };

  const handleConnectWalletClick = () => {
    if (accountAddress , buyAmount,algoAmount) {
      handleDisconnect();
    } else {
      handleConnect();
      
    }
  };

  return (
    <>
      <div className="App">
        <Column className="" width="75%" jatin>
          {accountAddress && (
            <p className="box-shadow">
              Wallet Address: {accountAddress.substring(0, 10)}...{accountAddress.slice(-10)}
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
                <Button onClick={handleConnectWalletClick} size="lg" className="chk">
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
