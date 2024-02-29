import { Button, Divider, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { numberToVietnameseWords } from '../../../ultils';
import { getReceiptById } from '../../../pages/admin/Receipt/slice';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const ModalReceiptDetail = ({ id, isModalOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const [receiptDetail, setReceiptDetail] = useState([]);
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'product_id',
      render: (data) => <span>{data?.code}</span>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_id',
      render: (data) => <span>{data?.name}</span>
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      className: 'truncate'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'product_id',
      render: (data) => (
        <span>
          {data?.price_root.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </span>
      )
    },
    {
      title: 'Thành tiền',
      width: '20%',
      render: (data) => (
        <span>
          {(data?.quantity * data?.product_id?.price_root).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </span>
      )
    }
  ];

  const getDetailReceipt = async () => {
    const { payload } = await dispatch(getReceiptById(id));
    setReceiptDetail(payload);
  };
  const generatePDF = useReactToPrint({
    content: () => document.querySelector('.ant-modal-content'),
    documentTitle: 'Hóa đơn giá trị gia tăng',
    bodyClass: 'pt-3',
    pageStyle: `
    @media print {
      .pagebreak {
        page-break-before: always;
      }
      .ant-modal-footer {
        display: none !important;
      }
    }
  `
  });
  useEffect(() => {
    if (id) {
      getDetailReceipt();
    }
  }, [id]);
  return (
    <>
      {receiptDetail && (
        <Modal
          width="80vw"
          open={isModalOpen}
          footer={
            <Button type="primary" className="bg-[#1677ff]" onClick={generatePDF}>
              Export PDF
            </Button>
          }
          closeIcon={null}
          onCancel={handleCancel}>
          <div className="p-5">
            <div className="flex">
              <div className="w-[50%]">
                <p>CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ CÔNG NGHỆ</p>
                <p>
                  Số 18, đường Trần Quang Diệu, Phường ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội,
                  Việt Nam
                </p>
              </div>
              <div className="w-[50%] text-center">
                <h2 className="text-[16px] font-semibold">Mẫu số: 01 - VT</h2>
                <i>
                  (Ban hành theo Thông tư số 113/2016/TT-BTC <br /> Ngày 26/08/2016 của Bộ Tài
                  Chính)
                </i>
              </div>
            </div>
            <div className="grid grid-cols-3 justify-center pt-5">
              <div></div>
              <div className="text-center leading-8">
                <h1 className="text-[24px] font-semibold">Phiếu nhập kho</h1>
                <p>Ngày nhập: {dayjs(receiptDetail?.import_date).format('DD/MM/YYYY')}</p>
                <p>
                  Số: <strong>{receiptDetail.code}</strong>
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <p>Nợ: 156</p>
                <p>Có: 237</p>
              </div>
            </div>
            <div className="flex flex-col pt-2 leading-8">
              <span>Họ và tên người giao: {receiptDetail.deliver}</span>
              <span>Theo hóa đơn số: {receiptDetail.code}</span>
              <span>Nhập tại kho: {receiptDetail.warehouse}</span>
              <span>Địa điểm: {receiptDetail.address}</span>
            </div>
            <Divider className="my-2" />
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={receiptDetail.list}
              bordered
              pagination={false}
            />
            <Divider className="my-2" />
            <div className="flex flex-col pt-2 leading-9">
              <span>
                Tổng tiền (đã bao gồm VAT):
                <strong className="pl-1">
                  {'199999900'.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </strong>
              </span>
              <span>
                Số tiền viết bằng chữ: <strong>{numberToVietnameseWords(199999900)}</strong>
              </span>
            </div>
            <Divider className="my-2" />
            <div className="flex pb-[100px] pt-3">
              <div className="flex w-[25%] flex-col items-center">
                <div>Người lập phiếu</div>
                <i className="text-[12px]">(Ký họ tên)</i>
              </div>
              <div className="flex w-[25%] flex-col items-center">
                <div>Người giao hàng</div>
                <i className="text-[12px]">(Ký họ tên)</i>
              </div>
              <div className="flex w-[25%] flex-col items-center">
                <div>Thủ kho</div>
                <i className="text-[12px]">(Ký họ tên)</i>
              </div>
              <div className="flex w-[25%] flex-col items-center">
                <div>Kế toán trưởng</div>
                <i className="text-[12px]">(Ký họ tên)</i>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default ModalReceiptDetail;
