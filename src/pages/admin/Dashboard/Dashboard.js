import React, { useState } from 'react';
import './Dashboard.css';
import { Progress } from 'antd';

const Dashboard = () => {
  return (
    <>
      <Progress type="dashboard" percent={75} />
      <Progress type="dashboard" percent={75} gapDegree={30} />
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} />
      <Progress percent={50} showInfo={false} />
    </>
  );
};

export default Dashboard;
