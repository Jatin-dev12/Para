import React from 'react';
import './App.css';
import Header from './pages/Header';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Pera from './pages/Pera'


function App() {
  return (
    <BrowserRouter >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Main/>} />
        <Route path="/Pera" element={<Pera />} />

      
        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>

  );
}

export default App;
