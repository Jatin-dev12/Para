import React from "react";
import { Outlet, } from "react-router-dom";
import Header from "./pages/Header";



const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet />
    

    </>
  )
};

export default Layout;