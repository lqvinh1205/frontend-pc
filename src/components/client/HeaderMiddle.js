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
              onChange={handleChangeSearch}
            />
            <button
              type="submit"
              className="h-auto bg-[#de0b00] px-2 text-[13px] text-white"
              onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>
        <div className="text-[#ee0000]">
          <span className="text-[14px]">Gọi mua hàng: </span>
          <span className="text-[26px]">1900 2164</span>
        </div>
        <div className="ml-5 flex gap-1">
          <button
            onClick={() => navigate('/carts')}
            className="h-[34px] rounded-[4px] border bg-[#dd0000] px-[5px] text-[14px] text-white">
            Giỏ hàng {count > 0 && <Badge count={count} color="#faad14" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
