import { Pagination } from 'antd';
import React from 'react';

const ListProducts = () => {
  const showTotal = (total) => `Tất cả ${total} sản phẩm`;
  const onChangePage = (page) => {
    console.log(page);
  };

  return (
    <div className="flex w-full max-w-[1650px] flex-col">
      <div
        id="title"
        className="mb-1 flex h-[36px] items-center bg-[#4471c2] pl-2 font-medium text-[#fff]">
        <h3 className="max">Tất cả sản phẩm</h3>
      </div>
      <div
        id="main-list-product"
        className="flex flex-wrap border border-b-0 border-r-0 border-[#ddd]">
        {Array.from({ length: 15 })
          .fill(null)
          .map((item, idx) => (
            <div
              key={idx}
              className="flex min-h-[370px] w-[calc(100%/6)] cursor-pointer flex-col border-b-[1px] border-r-[1px] text-[13px]">
              <div className="flex items-center justify-center">
                <img
                  src="https://phucanhcdn.com/media/product/250_43637_samsung_galaxy_tab_a7_lite__t225n__grey_a5.jpg"
                  alt=""
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-2">
                <p className="pb-1 leading-[18px]">
                  Máy tính bảng Samsung Galaxy A7 Lite T225 (3GB/ 32GB/ Gray) Máy tính bảng Samsung
                  Galaxy A7 Lite T225 (3GB/ 32GB/ Gray)
                </p>
                <div className="leading-4">
                  <i className="text-[12px]">Giá niêm yết:</i> <span>4.490.000 đ</span>
                </div>
                <div className="text-[#d42333]">
                  <i className="text-[12px]">Giá bán:</i>{' '}
                  <span className="text-[18px]">3.490.000 đ</span>
                </div>
              </div>
              <div className="flex justify-between px-2 pb-2">
                <span className="text-[#12bd1b]">Có hàng</span>
                <div className="text-[#d42333]">Giỏ hàng</div>
              </div>
            </div>
          ))}
      </div>
      <div id="pagination" className="flex justify-center pt-4">
        <Pagination size="small" total={30} onChange={onChangePage} showTotal={showTotal} />
      </div>
    </div>
  );
};

export default ListProducts;
