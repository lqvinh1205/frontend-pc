import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrand } from '../../pages/admin/Brand/slice';

const CategoryBrand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.list);

  useEffect(() => {
    dispatch(getBrand());
  }, []);
  return (
    <div className="min-h-[700px] w-[300px] border border-[#de0b00]">
      <ul className="flex flex-col text-[14px] text-[#0000ff]">
        {brands.map((item, idx) => (
          <a
            key={idx}
            href="/"
            className="border-b-[1px] pl-2 leading-[21px] last:border-none hover:bg-[#f5f5ff]">
            <li key={item.id} className="py-[5px]">
              {item.name}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default CategoryBrand;
