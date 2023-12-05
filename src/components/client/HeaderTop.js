import React from 'react';

const HeaderTop = () => {
  return (
    <div className="flex h-[34px] justify-center bg-[#365899]">
      <ul className="flex w-full max-w-[1650px] flex-wrap items-center gap-5 text-[13px] leading-[34px] text-white">
        <li>Bán hàng trực tuyến</li>
        <li>Khuyến mãi</li>
        <li>Mua trả góp</li>
        <li>Xây dựng cấu hình</li>
        <li>In Hóa đơn điện tử</li>
      </ul>
    </div>
  );
};

export default HeaderTop;
