import React, { useEffect, useRef, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import CategoryBrand from './CategoryBrand';

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="flex justify-center">
      <div className="flex h-[38px] w-full max-w-[1650px] flex-wrap items-center rounded-[4px] bg-[#365899]">
        <div className="px-2 pr-5 font-medium text-white">
          <span className="hidden md:flex">DANH MỤC SẢN PHẨM</span>
          <div className="relative" ref={dropdownRef}>
            <MenuOutlined
              className="cursor-pointer md:hidden"
              style={{ color: '#fff', fontSize: 25 }}
              onClick={() => setShow(!show)}
            />
            {show && (
              <div className="absolute bottom-1 top-0 z-50 w-[300px] translate-y-[110%] bg-white">
                <CategoryBrand show={show} />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <ul className="flex gap-5 text-[12px] text-[#f5f200] sm:text-[12.5px] lg:text-[13px]">
            <li>100% Chính hãng</li>
            <li>Giá ưu đãi nhất</li>
            <li>Miễn phí vận chuyển</li>
            <li className="hidden sm:flex">Bảo hành nơi sử dụng</li>
            <li className="hidden sm:flex">Hàng trưng bày giảm giá</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
