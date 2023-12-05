import React from 'react';
import { LIST_SHOWROOM } from '../../constants';

const Footer = () => {
  return (
    <div className="flex justify-center bg-[#4471c2]">
      <div className="flex max-w-[1650px] flex-wrap p-3">
        {LIST_SHOWROOM.map((item, idx) => (
          <div className="w-[25%] px-3 pb-5 text-white" key={idx}>
            <div className="mb-[10px] font-medium">{item.title}</div>
            <div className="text-[13px] leading-[20px]">
              <div>Địa chỉ: {item.address}</div>
              <div>Điện thoại: {item.phone}</div>
              <div>Email: {item.email}</div>
              <div>{item.open}</div>
              <div className="font-medium text-[#ffed00]">
                <a href={item.map}>[Bản đồ đường đi]</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
