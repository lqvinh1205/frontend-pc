import React, { useEffect, useState } from 'react';
const initStyles = {
  size: 'text-[14px]',
  bg: '',
  px: 'px-[12px]',
  py: 'py-[6px]'
};

const Button = ({ lable, onClick, children, styles = initStyles }) => {
  const { size, bg, px, py } = Object.assign({ ...initStyles }, styles);

  return (
    <button
      className={`flex h-full items-center justify-center rounded-[3px] text-white hover:bg-zinc-600 ${size} ${bg} ${px} ${px}`}
      onClick={onClick}>
      {children || lable}
    </button>
  );
};

export default Button;
