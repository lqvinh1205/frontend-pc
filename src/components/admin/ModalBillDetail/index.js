import { Avatar, Modal, Table, Button, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImage, numberToVietnameseWords } from '../../../ultils';
import { getBillById } from '../../../pages/admin/Bill/slice';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';

const ModalReceiptDetail = ({ id, isModalOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const [billDetail, setBillDetail] = useState([]);
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'receipt_detail_id',
      render: (data) => <a href="/">{data[0]?.product_id?.name}</a>
    },
    {
      title: 'Ảnh',
      dataIndex: 'receipt_detail_id',
      render: (data) => {
        return (
          <Avatar
            shape="square"
            size="large"
            icon={<img alt="" src={getImage(data[0]?.product_id?.thumbnail?.path)} />}
          />
        );
      }
    },
    {
      title: 'Giá',
      render: (_) => {
        return (
          <span className="text-red-600">
            {`${_.price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}`}
          </span>
        );
      },
      className: 'truncate'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      className: 'truncate',
      align: 'center'
    },
    {
      title: 'Thành tiền',
      render: (_) => {
        return (
          <div className="flex justify-between">
            <span className="text-red-600">{`${(_.price * _.quantity).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}`}</span>
          </div>
        );
      },
      className: 'truncate'
    }
  ];

  const getDetailBill = async () => {
    const { payload } = await dispatch(getBillById(id));
    setBillDetail(payload);
  };
  useEffect(() => {
    if (id) {
      getDetailBill();
    }
  }, [id]);

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

  return (
    <div>
      {billDetail && (
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
            <h3 className="text-center text-[28px]">Hóa đơn giá trị gia tăng</h3>
            <div className="flex flex-col items-end pt-3">
              <div className="w-[30%]">
                Mã hóa đơn: <strong>{billDetail?.code}</strong>
              </div>
              <div className="w-[30%]">
                Ngày bán: {dayjs(billDetail?.sale_date).format('DD/MM/YYYY')}
              </div>
            </div>
            <div className="flex flex-col pt-2 leading-8">
              <span>Tên người bán: {billDetail?.sale_staff}</span>
              <span>Địa chỉ: 119 Trung Kính, Trung Hòa, Hà Nội</span>
              <span>Số điện thoại: 1900284763</span>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col pt-2 leading-8">
              <span>Tên người người mua: {billDetail?.username}</span>
              <span>Địa chỉ: {billDetail?.address}</span>
              <span>Email: {billDetail?.email}</span>
              <span>Số điện thoại: {billDetail?.phone_number}</span>
              <span>Hình thức thanh toán: Tiền mặt</span>
            </div>
            <Divider className="my-2" />
            <Table
              columns={columns}
              rowKey="_id"
              dataSource={billDetail.list}
              bordered
              pagination={false}
            />
            <Divider className="my-2" />
            <div className="flex flex-col pt-2 leading-9">
              <span>
                Tổng tiền (đã bao gồm VAT):
                <strong className="pl-1">
                  {billDetail?.total?.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}
                </strong>
              </span>
              <span>
                Số tiền viết bằng chữ: <strong>{numberToVietnameseWords(billDetail?.total)}</strong>
              </span>
            </div>
            <Divider className="my-2" />
            <div className="flex pb-[100px]">
              <div className="flex w-[50%] flex-col items-center">
                <div>Người mua hàng</div>
                <i className="text-[12px]">Chữ ký số (nếu có)</i>
              </div>
              <div className="flex w-[50%] flex-col items-center">
                <div>Người bán hàng</div>
                <i className="text-[12px]">Chữ ký điện tử, chữ ký số</i>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default ModalReceiptDetail;
