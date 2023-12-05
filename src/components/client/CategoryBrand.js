import React from 'react';

const list = [
  {
    id: 1,
    name: 'Asus'
  },
  {
    id: 1,
    name: 'Lenovo'
  },
  {
    id: 1,
    name: 'Dell'
  },
  {
    id: 1,
    name: 'Asus'
  },
  {
    id: 1,
    name: 'Lenovo'
  },
  {
    id: 1,
    name: 'Dell'
  },
  {
    id: 1,
    name: 'Asus'
  },
  {
    id: 1,
    name: 'Lenovo'
  },
  {
    id: 1,
    name: 'Dell'
  }
];
const CategoryBrand = () => {
  return (
    <div className="min-h-[700px] w-[300px] border border-[#de0b00]">
      <ul className="flex flex-col text-[14px] text-[#0000ff]">
        {list.map((item) => (
          <a
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
