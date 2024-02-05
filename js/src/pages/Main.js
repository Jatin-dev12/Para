import React from 'react';
import '../App.css';

const Column = ({ children, width, shadow }) => {
  return (
    <div className={`column ${shadow && 'shadow'}`} style={{ width }}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <>
    <div className="App">
      <Column  className="" width="75%"  shadow>
      <h2 className='yup'>Stake BUY Tokens
</h2>
      
      </Column>
           <Column width="25%">
        <h3 className='b'>Balance</h3>
        <p>Staked</p>
        <p>Rewards</p>
        <p>Total</p>
        <p>Total Value</p>
      </Column>
    </div>
   <div>
    <Column className="ll" width="75%"></Column>
    </div>
  
    </>
  );
};

export default App;