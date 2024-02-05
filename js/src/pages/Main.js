import React from 'react';
import '../App.css';
import { Row, Col ,Button, Container } from 'react-bootstrap';




const Column = ({ children, width, shadow }) => {
  return (
    <div className={`column ${shadow && 'shadow'}`} style={{ width }}>
      {children}
    </div>
  );
};

const Main = () => {
  return (
    <>
    <div className="App">
      <Column  className="" width="75%"  shadow>
      <h2 className='yup'>Stake BUY Tokens
</h2> 
<Container>
<Row>
        <Col sm><h3>Participating Pool
</h3> <p>Stake Your Buy Token and earn 8% APY
</p>  </Col>
        <Col sm></Col>
        <Col sm><Button size="lg" className='chk'>Stake Now</Button></Col>
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
