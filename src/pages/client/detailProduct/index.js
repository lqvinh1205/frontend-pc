import React, { useEffect, useState } from 'react';
import { Carousel, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from './slice';
import { getImage } from '../../../ultils';
import CarouselDetailProduct from '../../../components/client/CarouselDetailProduct';
import { CaretRightOutlined } from '@ant-design/icons';

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = useSelector((state) => state.detailProduct.product);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (product.images) {
      let urls = product?.images?.map((item) => {
        return getImage(item?.path);
      });
      urls = [getImage(product?.thumbnail?.path), ...urls];
      setImageUrls(urls);
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div className="mx-auto my-2 flex w-full max-w-[1650px] flex-wrap gap-4">
      <div className="w-[40%]">{imageUrls && <CarouselDetailProduct imageUrls={imageUrls} />}</div>
      <div className="flex flex-1 flex-col">
        <div className="overflow-hidden rounded-[8px] bg-[#f0f0f0] p-3">
          <div className="flex items-center">
            <div className="w-[40%] text-[14px]">Giá niêm yết:</div>
            <div className="text-[20px] font-medium leading-[42px]">{product.price_root} VND</div>
          </div>
          <div className="flex items-center">
            <div className="w-[40%] text-[14px] font-medium">Giá ưu đãi tháng 12:</div>
            <div className="text-[25px] font-semibold leading-[38px] text-[#ee0000]">
              {product.price} VND
              <span className="text-[12px] font-normal text-[#888]">[Giá đã có VAT]</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[40%] text-[14px] font-medium"></div>
            <div className="text-[13px] leading-[38px] text-blue-800">
              Học sinh, sinh viên giảm thêm 168.000 ₫
            </div>
          </div>
        </div>
        <div className="my-3 text-[14px]">
          <strong>Bảo hành:</strong> 12 Tháng. Bảo hành tại hãng. Bảo hành tại nơi sử dụng. Đổi mới
          30 ngày.
        </div>
        <div className="mb-3 text-[14px] text-[#ee0000]">
          Giao hàng tận nơi miễn phí theo chính sách vận chuyển
        </div>
        <div className="flex cursor-pointer flex-col items-center bg-gradient-to-b from-[#ff3838] to-[#a80002] py-4 text-white">
          <div className="text-[15px] font-semibold">MUA NGAY</div>
          <div>Giao hàng tận nơi nhanh chóng</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="flex cursor-pointer flex-col items-center bg-gradient-to-b from-[#3481bc] to-[#003cb5] py-4 text-white">
            <div className="text-[15px] font-semibold">CHO VÀO GIỎ</div>
            <div>Mua tiếp sản phẩm khác</div>
          </div>
          <div className="flex cursor-pointer items-center justify-center bg-gradient-to-b from-[#3481bc] to-[#003cb5] py-4 text-[15px] font-semibold text-white">
            MUA TRẢ GÓP
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-[8px]">
          <div className="bg-[#d1d5db] p-3 font-medium text-[#e80c00]">
            ƯU ĐÃI VÀ QUÀ TẶNG KHUYẾN MÃI:
          </div>
          <div className="bg-[#f0f0f0] p-3 leading-[30px]">
            Áp dụng từ 01/12/2023 đến 31/12/2023 <br />
            ✦ Chuột không dây
            <br />
            ✦ Túi chống sốc
            <br />
            ✦ Balo MTXT
            <br />
            ✦ Tặng gói bảo trì, bảo dưỡng laptop miễn phí tại Phúc Anh
            <br />
            ✦ Mua Laptop kèm Microsoft Office nhận ngay voucher giảm giá Office lên tới 150.000 VND
            (Xem ngay)
            <br />
            ✦ Giảm 20% khi mua phụ kiện Lenovo chính hãng (Xem ngay)
            <br />
            ✦ Giảm 10% ram Laptop khi mua kèm laptop (Xem ngay)
            <br />
            ✦ Mua phụ kiện kèm laptop giảm 10% (Thiết bị chuyển đổi, Các loại cáp)
            <br />
            ✦ Giảm 20% giá làm mát khi mua kèm laptop
            <br />
            ✦ Giảm 20% cặp, túi chống sốc, balo thời trang khi mua kèm laptop
            <br />
            ✦ Mua chuột kèm laptop giảm 5% (Xem ngay)
            <br />
            ✦Mua thêm 1 năm bảo hành chính hãng chỉ với 1.990.000đ (Xem ngay)
            <br />
          </div>
        </div>
        <div
          onClick={showModal}
          className="mt-3 flex w-[30%] cursor-pointer items-center justify-center rounded-[8px] border border-blue-400 p-3 text-[14px] text-blue-400">
          Xem chi tiết cấu hình <CaretRightOutlined />
        </div>
        {product.config && (
          <Modal open={isModalOpen} footer={null} closeIcon={null} onCancel={handleCancel}>
            {Object.keys(JSON.parse(product.config))?.map((id) => {
              const item = JSON.parse(product.config)[id];
              return (
                <div key={id}>
                  <div className="bg-[#d1d5db] p-3 text-[#ff0000]">{item.name}</div>
                  <div className="divide-y divide-slate-200">
                    {item.list?.map((config) => (
                      <div className="grid grid-cols-3 px-3 py-2">
                        <div>{config.name}</div>
                        <div className="col-span-2">{config.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DetailProduct;
