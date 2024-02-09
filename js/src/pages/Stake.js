import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Stake = ({ stakeData }) => {
  const [rewardsTimer, setRewardsTimer] = useState('');

  useEffect(() => {
    if (!stakeData) return;

    const calculateRewardsTimer = () => {
      const endTime = new Date(stakeData.rewardsEndTime);
      const currentTime = new Date();
      const differenceInSeconds = Math.floor((endTime - currentTime) / 1000);

      if (differenceInSeconds >= 0) {
        const days = Math.floor(differenceInSeconds / 86400);
        const hours = Math.floor((differenceInSeconds % 86400) / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        setRewardsTimer(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
      } else {
        setRewardsTimer('');
      }
    };

    const timer = setInterval(calculateRewardsTimer, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [stakeData?.rewardsEndTime]);

  return (
    <Container>
      <Card className="mt-5">
        <Card.Body>
          <Row>
            <Col sm={6}>
              <h5>My Stakes</h5>
              <p>Amount Staked: {stakeData?.amountStaked || 0} BUY</p>
            </Col>
            <Col sm={6}>
              <h5>Rewards Timer</h5>
              <p>{rewardsTimer}</p>
              <p>Remaining</p>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <h5>Rewards Earned</h5>
              <p>{stakeData?.rewardsEarned || 0} BUY</p>
            </Col>
            <Col sm={6}>
              <h5>Total if Withdrawn</h5>
              <p>{stakeData?.totalIfWithdrawn || 0}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <h5>Current Value</h5>
              <p>${stakeData?.currentValue || 0}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p className="text-muted">* Rewards visible after 30 days</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p className="text-muted">Initiated</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Stake ;