import React from 'react';
import HeaderTop from '../components/client/HeaderTop';
import HeaderBottom from '../components/client/HeaderBottom';
import HeaderMiddle from '../components/client/HeaderMiddle';
import { Outlet } from 'react-router-dom';
import Footer from '../components/client/Footer';

const clientLayout = () => {
  return (
    <div className="flex flex-col">
      <div id="header">
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom />
      </div>
      <div id="main" className="flex-1">
        <Outlet />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default clientLayout;
