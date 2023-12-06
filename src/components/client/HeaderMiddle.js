import React from 'react';

const HeaderMiddle = () => {
  return (
    <div className="flex justify-center">
      <div className="flex h-[90px] w-full max-w-[1650px] flex-wrap items-center">
        <div className="">
          <a href="/">
            <img
              className="h-auto max-w-full border-none object-cover"
              src="https://phucanhcdn.com/media/banner/logo_logo_logo (1).png"
              alt=""
            />
          </a>
        </div>
        <div className="flex-1 px-8">
          <form className="flex flex-row overflow-hidden rounded-[3px] border border-[#de0b00]">
            <input
              type="text"
              className="h-[32px] w-full pl-2 text-[13px] outline-none"
              name=""
              id=""
              placeholder="Nhập từ khóa tìm kiếm"
            />
            <button type="submit" className="h-auto bg-[#de0b00] px-2 text-[13px] text-white">
              Search
            </button>
          </form>
        </div>
        <div className="text-[#ee0000]">
          <span className="text-[14px]">Gọi mua hàng: </span>
          <span className="text-[26px]">1900 2164</span>
        </div>
        <div className="ml-5">
          <a href="/">
            <button className="h-[34px] rounded-[4px] border bg-[#dd0000] px-[5px] text-[14px] text-white">
              Giỏ hàng
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
