import React from 'react';
import {
  BsChevronDown,
  BsChevronLeft,
  BsFillGrid1X2Fill,
  BsPlus,
  BsQrCodeScan
} from 'react-icons/bs';
import Button from './Button';

const children = [
  {
    id: 3,
    lable: 'Company overview',
    thumbnail:
      'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg'
  },
  {
    id: 4,
    lable: 'Company overview',
    thumbnail:
      'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg'
  }
];

const Sidebar = () => {
  return (
    <div className="flex w-[260px] flex-1 flex-col border-r-[1px] border-r-slate-600 bg-slate-900 text-white">
      <div className="flex items-center border-b-[1px] border-b-slate-600 px-3 py-4">
        <div className="flex flex-1">
          <div className="flex w-full items-center gap-2">
            <div className="h-[36px] w-[36px] overflow-hidden rounded-[3px]">
              <img
                className="h-full object-cover"
                src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg"
                alt=""
              />
            </div>
            <div className="flex-1">
              <div className="text-[14px] font-bold">Project Todo</div>
              <div className="text-[12px]">Free</div>
            </div>
          </div>
        </div>
        <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center bg-slate-800">
          <BsChevronLeft size={12} />
        </div>
      </div>
      <div className="flex flex-1 flex-col border-b-[1px] border-b-slate-600 py-3">
        <ul className="mb-2">
          <li className="flex h-[32px] cursor-pointer pl-4 hover:bg-slate-800">
            <a href="" className="flex items-center gap-3">
              <BsFillGrid1X2Fill size={12} />
              <div className="flex-1 text-[14px]">Bảng</div>
            </a>
          </li>
          <li className="flex h-[32px] cursor-pointer pl-4 hover:bg-slate-800">
            <a href="" className="flex w-full items-center gap-3">
              <BsFillGrid1X2Fill size={12} />
              <div className="flex-1 text-[14px]">Thành viên</div>
              <div className="flex w-[32px] items-center justify-center">
                <BsPlus size={20} />
              </div>
            </a>
          </li>
          <li className="flex h-[32px] cursor-pointer pl-4 hover:bg-slate-800">
            <a href="" className="flex w-full items-center gap-3">
              <BsFillGrid1X2Fill size={12} />
              <div className="flex-1 text-[14px]">Các không gian làm việc</div>
              <div className="flex w-[32px] items-center justify-center">
                <BsChevronDown size={12} />
              </div>
            </a>
          </li>
        </ul>
        <ul className="mb-2">
          <div className="fon flex h-[32px] items-center pl-2 text-[14px] font-bold">
            <h1 className="flex-1">Dạng xem không gian làm việc</h1>
          </div>
          <li className="flex h-[32px] cursor-pointer pl-4 hover:bg-slate-800">
            <a href="" className="flex items-center gap-3">
              <BsFillGrid1X2Fill size={12} />
              <div className="flex-1 text-[14px] italic">Lịch</div>
            </a>
          </li>
        </ul>
        <ul className="mb-2">
          <div className="fon flex h-[32px] items-center pl-2 text-[14px] font-bold">
            <h2 className="flex-1">Các bảng của bạn</h2>
            <div className="flex w-[32px] cursor-pointer items-center justify-center">
              <BsPlus size={20} />
            </div>
          </div>
          {children.map((item) => {
            return (
              <li
                className="flex h-[32px] cursor-pointer items-center gap-3 pl-4 hover:bg-slate-800"
                key={item.id}>
                <div className="h-[20px] w-[25px] overflow-hidden rounded-[3px]">
                  <img src={item.thumbnail} className="h-full object-cover" alt="" />
                </div>
                <div className="flex-1 text-[14px]">{item.lable}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center px-2 py-4">
        <Button styles={{ bg: 'bg-[#aa63cb]' }}>
          <div className="flex items-center gap-3">
            <BsQrCodeScan />
            Dùng thử Premium miễn phí
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
