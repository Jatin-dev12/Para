import React from 'react';
import './App.css';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Pera from './pages/Pera'
import Stake from './pages/Stake';


function App() {
  return (
    <BrowserRouter >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Main/>} />
        <Route path="/Pera" element={<Pera />} />
        <Route path="/Stake" element={<Stake />} />


      
        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>

  );
}

export default App;
