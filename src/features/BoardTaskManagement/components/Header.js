import React from 'react';
import {
  BsBell,
  BsChevronDown,
  BsFillGrid3X3GapFill,
  BsQuestionCircle,
  BsTrello
} from 'react-icons/bs';
import Button from '../../../component-core/Button';
import Dropdown from '../../../component-core/Dropdown';
import Search from '../../../component-core/Search';

const Header = () => {
  return (
    <div className="flex h-[44px] items-center gap-1 bg-[#010204] px-1 py-1">
      <div className="flex h-full items-center gap-1">
        <Button>
          <BsFillGrid3X3GapFill size={16} />
        </Button>
        <Button>
          <div className="flex items-center gap-2">
            <BsTrello size={16} />
            <span className="font-bold">TRELLO</span>
          </div>
        </Button>
      </div>
      <div className="flex h-full gap-1">
        <Dropdown lable="Các công việc gần đây" icon={<BsChevronDown />} />
        <Dropdown lable="Gần đây" icon={<BsChevronDown />} />
        <Dropdown lable="Đã đánh dấu sao" icon={<BsChevronDown />} />
        <Dropdown lable="Mẫu" icon={<BsChevronDown />} />
        <Button styles={{ bg: 'bg-zinc-700' }}>Tạo mới</Button>
      </div>
      <div className="flex flex-1 justify-end gap-1">
        <Search />
        <Dropdown icon={<BsBell size={16} />} styles={{ rounded: 'rounded-[50%]' }} />
        <Dropdown icon={<BsQuestionCircle size={16} />} styles={{ rounded: 'rounded-[50%]' }} />
      </div>
    </div>
  );
};

export default Header;
