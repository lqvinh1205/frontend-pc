import { Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct } from '../../pages/client/homepage/slice';

const HeaderMiddle = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(
      getProduct({
        query: `perpage=12&page=1` + (search ? `&search=${search}` : '')
      })
    );
  };
  const handleChangeSearch = async (e) => {
    const search = e.target.value;
    setSearch(search);
    if (search === '') {
      await dispatch(
        getProduct({
          query: `perpage=12&page=1`
        })
      );
    }
  };
  useEffect(() => {
    if (localStorage.getItem('carts') && Array.isArray(JSON.parse(localStorage.getItem('carts'))))
      setCount(JSON.parse(localStorage.getItem('carts')).length);
  }, [localStorage.getItem('carts')]);

  return (
    <div className="flex justify-center">
      <div className="flex h-[90px] w-full max-w-[1650px] flex-wrap items-center px-2">
        <div className="order-1 flex flex-1 justify-between">
          <a href="/">
            <img
              className="h-auto max-w-full border-none object-cover"
              src="https://phucanhcdn.com/media/banner/logo_logo_logo (1).png"
              alt=""
            />
          </a>
        </div>
        <div className="order-3 flex w-full md:order-2 md:flex-1 md:px-8">
          <form className="flex w-full flex-row overflow-hidden rounded-[3px] border border-[#de0b00]">
            <input
              type="text"
              className="h-[32px] w-full pl-2 text-[13px] outline-none"
              name=""
              id=""
              placeholder="Nhập từ khóa tìm kiếm"
              onChange={handleChangeSearch}
            />
            <button
              type="submit"
              className="h-auto bg-[#de0b00] px-2 text-[11px] text-white sm:text-[13px]"
              onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
        <div className="order-2 flex flex-wrap md:order-3">
          <div className="text-[#ee0000]">
            <span className="text-[12px] sm:text-[14px]">Gọi mua hàng: </span>
            <span className="text-[20px] sm:text-[26px]">1900 2164</span>
          </div>
          <div className="ml-1 flex gap-1 sm:ml-5">
            <button
              onClick={() => navigate('/carts')}
              className="h-[34px] rounded-[4px] border bg-[#dd0000] px-[5px] text-[12px] text-white sm:text-[14px]">
              Giỏ hàng {count > 0 && <Badge count={count} color="#faad14" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
