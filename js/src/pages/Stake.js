import React from 'react'

function Stake() {
  return (
    <div>
      
    </div>
  )
}

export default Stake


// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from 'react-router-dom';

// function Stake() {
//   const [show, setShow] = useState(false);
//   const [isContent1Visible, setIsContent1Visible] = useState(true);
//   const navigate = useNavigate();

//   const handleClose = () => setShow(false);

//   const toggleContent = () => {
//     setIsContent1Visible(!isContent1Visible);
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={setShow}>
//         Stake Bro Lets Make Money
//       </Button>

//       <Modal show={show} backdrop="static" animation={true}  onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Stake Buy Tokens</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Buy Amount</Form.Label>
//               <Form.Control
//                 type="numeric"
//                 placeholder="Amount"
//                 autoFocus
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer className='justify-content-center'>
//           <Button variant="primary" onClick={() => setShow(false)}>
//             Stake Now
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <div>
//         <button onClick={toggleContent}>Toggle Content</button>
//         {isContent1Visible && (
//           <p>
//             This is the first content section. It is initially visible and will be
//             hidden when the button is clicked.
//           </p>
//         )}
//         {!isContent1Visible && (
  
//         <Modal show={show} backdrop="static" onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Stake Buy Tokens</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label>Buy Amount</Form.Label>
//                 <Form.Control
//                   type="numeric"
//                   placeholder="Amount"
//                   autoFocus
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer className='justify-content-center'>
//             <Button variant="primary" onClick={() => setShow(false)}>
//               Stake Now
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         )}
//       </div>
//     </>
//   );
// }

// export default Stake;


// // import React, { useState } from 'react';
// // import Button from 'react-bootstrap/Button';
// // import Form from 'react-bootstrap/Form';
// // import Modal from 'react-bootstrap/Modal';

// // function Stake() {
// //   const [show, setShow] = useState(false);

// //   const handleClose = () => setShow(false);
// //   const [isContent1Visible, setIsContent1Visible] = useState(true);
// //     const toggleContent = () => {
// //         setIsContent1Visible(!isContent1Visible);
// //       };

// //   return (
// //     <>
// //       <Button variant="primary" onClick={() => setShow(true)}>
// //         Stake Bro Lets Make Money
// //       </Button>

// //       <Modal show={show} backdrop="static" onHide={handleClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Stake Buy Tokens</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
// //               <Form.Label>Buy Amount</Form.Label>
// //               <Form.Control
// //                 type="numeric"
// //                 placeholder="Amount"
// //                 autoFocus
// //               />
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer className='justify-content-center'>
// //           <Button variant="primary" onClick={() => setShow(false)}>
// //             Stake Now
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //       <div>
// //       <button onClick={toggleContent}>Toggle Content</button>
// //       {isContent1Visible && (
// //         <p>
// //           This is the first content section. It is initially visible and will be
// //           hidden when the button is clicked.
// //         </p>
// //       )}
// //       {!isContent1Visible && (
// //         <p>
// //           This is the second content section. It is initially hidden and will be
// //           shown when the button is clicked.
// //         </p>
// //       )}
// //     </div>
// //     </>
// //   );
// // }

// // export default Stake;