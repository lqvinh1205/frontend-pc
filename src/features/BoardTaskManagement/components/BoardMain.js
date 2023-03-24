import React from 'react';
import BoardContent from '../../../component-core/BoardContent';
import Sidebar from '../../../component-core/Sidebar';
import UtilsBar from '../../../component-core/UtilsBar';

const BoardMain = () => {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 bg-sky-900">
        <UtilsBar />
        hello
        <BoardContent />
      </div>
    </div>
  );
};

export default BoardMain;
