import React, { useEffect, useState } from 'react';
const initStyles = {
  size: 'text-[14px]',
  bg: ''
};

const Button = ({ lable, onClick, children, styles = initStyles }) => {
  const { size, bg } = Object.assign({ ...initStyles }, styles);

  return (
    <button
      className={`flex h-full items-center justify-center rounded-[3px] px-[12px] py-[6px] text-white hover:bg-zinc-600 ${size} ${bg}`}
      onClick={onClick}>
      {children || lable}
    </button>
  );
};

export default Button;
