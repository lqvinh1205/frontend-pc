import { Avatar, Descriptions, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImage } from '../../../ultils';
import { getBillById } from '../../../pages/admin/Bill/slice';
import dayjs from 'dayjs';

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
        return <span className="text-red-600">{`${_.price}`} VND</span>;
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Thành tiền',
      render: (_) => {
        return (
          <div className="flex justify-between">
            <span className="text-red-600">{`${_.price * _.quantity}`} VND</span>
          </div>
        );
      }
    }
  ];
  const items = [
    {
      key: '1',
      label: 'Họ và tên',
      children: billDetail?.username
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: billDetail?.phone_number
    },
    {
      key: '3',
      label: 'Mã hóa đơn',
      children: billDetail?.code
    },
    {
      key: '4',
      label: 'Email',
      children: billDetail?.email
    },
    {
      key: '5',
      label: 'Ghi chú',
      span: 2,
      children: billDetail?.note
    },
    {
      key: '6',
      label: 'Địa chỉ',
      span: 2,
      children: billDetail?.address
    },
    {
      key: '7',
      label: 'Ngày bán',
      children: dayjs(billDetail?.sale_date).format('DD/MM/YYYY')
    },
    {
      key: '8',
      label: 'Trạng thái',
      span: 2,
      children: billDetail?.status
    },
    {
      key: '7',
      label: 'Tổng tiền',
      children: <span className="font-semibold text-red-600">{billDetail?.total}</span>
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
  return (
    <>
      {billDetail && (
        <Modal
          title="Hóa đơn chi tiết"
          width="80vw"
          open={isModalOpen}
          footer={null}
          closeIcon={null}
          onCancel={handleCancel}>
          <Descriptions className="py-4" layout="vertical" items={items} />
          <Table columns={columns} dataSource={billDetail.list} bordered pagination={false} />
        </Modal>
      )}
    </>
  );
};
export default ModalReceiptDetail;
