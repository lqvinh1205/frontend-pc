import React from 'react';

const HeaderBottom = () => {
  return (
    <div className="flex justify-center">
      <div className="flex h-[38px] w-full max-w-[1650px] flex-wrap items-center rounded-[4px] bg-[#365899]">
        <div className="px-2 pr-5 font-medium text-white">DANH MỤC SẢN PHẨM</div>
        <div className="flex-1">
          <ul className="flex gap-5 text-[13px] text-[#f5f200]">
            <li>100% Chính hãng</li>
            <li>Giá ưu đãi nhất</li>
            <li>Miễn phí vận chuyển</li>
            <li>Bảo hành nơi sử dụng</li>
            <li>Hàng trưng bày giảm giá</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
