import React from 'react';
import BoardMain from './components/BoardMain';
import Header from './components/Header';

const BoardTaskManagement = () => {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Header />
      <BoardMain />
    </div>
  );
};

export default BoardTaskManagement;
