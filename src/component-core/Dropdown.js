import React, { useRef } from 'react';
import { useState } from 'react';
import { BsChevronUp } from 'react-icons/bs';
import { nanoid } from '@reduxjs/toolkit';
import useClickOutside from '../hook/useClickOutside';
import UseDetectPositionAvailable from '../hook/useDetectPositionAvailable';
import { useEffect } from 'react';
const initStyles = {
  size: 'text-[14px]',
  px: 'px-[12px]',
  py: 'py-[6px]',
  rounded: 'rounded-[3px]',
  bg: '',
  color: ''
};

const Dropdown = ({ lable, onClick, children, header, footer, icon, styles = initStyles }) => {
  const { size, px, py, rounded, bg, color } = Object.assign({ ...initStyles }, styles);
  const data = [
    {
      category: 'Các mẫu hàng đầu',
      children: [
        {
          id: 1,
          lable: 'Company overview',
          thumbnail:
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg'
        },
        {
          id: 2,
          lable: 'Company overview',
          thumbnail:
            'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/350dda08d977f92d756f3d9ec111ea66/photo-1521495084171-3ad639e3d525.jpg'
        }
      ]
    },
    {
      category: 'Các mẫu hàng đầu',
      children: [
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
      ]
    }
  ];
  const ref = useRef();
  const refParent = useRef();
  const [visible, setVisible] = useState(false);
  const [childHeight, setChildHeight] = useState(null);
  const [childWidth, setChildWidth] = useState(null);

  const toggleDropdown = () => setVisible(!visible);
  useClickOutside(ref, () => setVisible(false));

  useEffect(() => {
    if (!ref.current) return;
    setChildHeight(ref.current.offsetHeight);
    setChildWidth(ref.current.offsetWidth);
  }, [visible]);

  return (
    <div className="relative" ref={refParent}>
      <div
        className={`flex h-full cursor-pointer items-center justify-center text-white hover:bg-gray-700 ${px} ${py} ${rounded} ${bg}`}
        onClick={toggleDropdown}>
        <div className={`flex items-baseline gap-2 ${size} ${color}`}>
          {children ? (
            children
          ) : (
            <>
              {lable}
              {icon}
            </>
          )}
        </div>
      </div>
      {visible && (
        <UseDetectPositionAvailable refParent={refParent} height={childHeight} width={childWidth}>
          <div
            ref={ref}
            className="top absolute top-[40px] left-0 z-50 w-[304px] rounded-[3px] bg-white opacity-100 shadow-lg">
            <div className="p-[12px] text-[#5e6c84]">
              {data.length == 0 && (
                <div className="flex flex-col">
                  <div className="w-full py-2">
                    <img
                      src="https://a.trellocdn.com/prgb/assets/cc47d0a8c646581ccd08.svg"
                      alt=""
                    />
                  </div>
                  <div className="pt-2 pb-1 text-center text-[14px]">
                    Gắn dấu sao các bảng quan trọng để truy cập nhanh và dễ dàng.
                  </div>
                </div>
              )}
              {data.map((item) => {
                return (
                  <div key={nanoid()}>
                    <h2 className="flex items-center justify-between text-[12px] font-medium">
                      {item.category} <BsChevronUp className="cursor-pointer" />
                    </h2>
                    <ul className="pt-2">
                      {item.children.map((item) => {
                        return (
                          <li
                            className="mb-2 flex h-[32px] cursor-pointer items-center gap-2 hover:bg-slate-100"
                            key={item.id}>
                            <div className="h-full w-[40px] overflow-hidden rounded-[3px]">
                              <img src={item.thumbnail} className="h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 text-[14px] font-medium text-[#172B4D]">
                              {item.lable}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </UseDetectPositionAvailable>
      )}
    </div>
  );
};

export default Dropdown;
