import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../pages/admin/Brand/slice';
import { getProduct } from '../../pages/client/homepage/slice';

const CategoryBrand = ({ show }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.list);
  const handleSearchByBrand = async (id) => {
    await dispatch(
      getProduct({
        query: `perpage=12&page=1` + (id ? `&brand=${id}` : '')
      })
    );
  };
  useEffect(() => {
    dispatch(getBrand());
  }, []);
  return (
    <div
      className={`w-full border border-[#de0b00] bg-white md:block md:min-h-[700px] ${
        !show ? 'hidden' : ''
      }`}>
      <ul className="flex flex-col text-[14px] text-[#0000ff]">
        <div
          onClick={() => handleSearchByBrand()}
          className="cursor-pointer border-b-[1px] pl-2 leading-[21px] last:border-none hover:bg-[#f5f5ff]">
          <li className="py-[5px]">Tất cả</li>
        </div>
        {brands.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSearchByBrand(item._id)}
            className="cursor-pointer border-b-[1px] pl-2 leading-[21px] last:border-none hover:bg-[#f5f5ff]">
            <li key={item.id} className="py-[5px]">
              {item.name}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBrand;
