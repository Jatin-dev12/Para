import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './chek.js'

const chek = () => {
  return (
    <Container className='con'>
      <Row>
        <Col className="left shadow">Column 1</Col>
        <Col xs lg="2" classname="right" >Column 2</Col>
      </Row>
      <Row>
        <Col className="side shadow" >Column 3</Col>
      </Row>
    </Container>
  );
};

export default chek;