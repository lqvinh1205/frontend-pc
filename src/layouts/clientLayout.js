import React from 'react';
import HeaderTop from '../components/client/HeaderTop';
import HeaderBottom from '../components/client/HeaderBottom';
import HeaderMiddle from '../components/client/HeaderMiddle';
import { Outlet } from 'react-router-dom';

const clientLayout = () => {
  console.log(1111);
  return (
    <div>
      <div id="header">
        {/* <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom /> */}
      </div>
      <div id="main">
        <Outlet />
      </div>
      <div id="footer"></div>
    </div>
  );
};

export default clientLayout;
