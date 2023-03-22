import React, { useRef, useState } from 'react';
import { BsChevronDown, BsSuitHeart, BsThreeDots } from 'react-icons/bs';
import Button from './Button';
import DriverCol from './DriverCol';
import Dropdown from './Dropdown';

const UtilsBar = () => {
  const [value, setValue] = useState('Project Utils');
  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div className="flex h-[48px] items-center px-2">
      <div className="flex h-[32px] w-full items-center">
        <label
          tabIndex={0}
          className="min-w-5 group relative flex min-w-min cursor-pointer items-center overflow-hidden rounded-[3px]">
          <input
            onChange={handleChange}
            type="text"
            value={value}
            onFocus={(e) => e.target.select()}
            className="invisible absolute left-0 h-[32px] w-full py-2 px-4 text-[18px] font-bold outline-none group-focus-within:visible group-focus-within:border group-focus-within:border-cyan-400"
          />
          <span className="flex h-[32px] items-center whitespace-pre-wrap py-2 px-4 text-[18px] font-bold text-white hover:bg-zinc-600/70  group-focus-within:invisible">
            {value}
          </span>
        </label>
        <Button styles={{ bg: 'bg-zinc-600/70' }}>
          <BsSuitHeart />
        </Button>
        <DriverCol />
        <Dropdown lable="Hiển thị trong không gian làm việc" styles={{ bg: 'bg-zinc-600/70' }} />
        <DriverCol />
        <div className="flex gap-2">
          <Dropdown styles={{ bg: 'bg-white' }}>
            <span className="font-medium text-black group-hover:text-white">Bảng</span>
          </Dropdown>
          <Dropdown styles={{ bg: 'bg-zinc-600/70', px: 'px-2' }}>
            <BsChevronDown size={20} />
          </Dropdown>
        </div>
        <div className="flex flex-1 justify-end gap-1">
          <Dropdown lable="Tiện ích bổ sung" styles={{ bg: 'bg-zinc-600/70' }} />
          <Dropdown lable="Tự động hóa" styles={{ bg: 'bg-zinc-600/70' }} />
          <DriverCol />
          <Dropdown lable="Lọc" styles={{ bg: 'bg-zinc-600/70' }} />
          <DriverCol />
          <Dropdown styles={{ bg: 'bg-white' }}>
            <span className="font-medium text-black group-hover:text-white">Chia sẻ</span>
          </Dropdown>
          <DriverCol />
          <Dropdown styles={{ bg: 'bg-zinc-600/70' }}>
            <BsThreeDots />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default UtilsBar;
