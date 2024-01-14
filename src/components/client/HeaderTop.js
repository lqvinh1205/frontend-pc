import React from 'react';
import { Link } from 'react-router-dom';

const HeaderTop = () => {
  return (
    <div className="hidden h-[34px] justify-center bg-[#365899] px-1 sm:flex">
      <div className="flex w-full max-w-[1650px]">
        <ul className="flex flex-1 flex-wrap items-center gap-5 text-[13px] leading-[34px] text-white">
          <li>Bán hàng trực tuyến</li>
          <li>Khuyến mãi</li>
          <li>Mua trả góp</li>
          <li>Xây dựng cấu hình</li>
          <li>In Hóa đơn điện tử</li>
        </ul>
        <div className="flex flex-wrap text-[13px] leading-[34px] text-white">
          <ul className="flex gap-2">
            <Link to="/signup">
              <li>Đăng ký</li>
            </Link>
            |
            <Link to="/signin">
              <li>Đăng nhập</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
