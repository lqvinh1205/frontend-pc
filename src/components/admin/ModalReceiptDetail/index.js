import { Avatar, Button, Descriptions, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImage } from '../../../ultils';
import { getReceiptById } from '../../../pages/admin/Receipt/slice';
import dayjs from 'dayjs';

const ModalReceiptDetail = ({ id, isModalOpen, handleCancel }) => {
  const dispatch = useDispatch();

  const [receiptDetail, setReceiptDetail] = useState([]);
  console.log(receiptDetail);
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'receipt_detail_id',
      render: (data) => <span>{data?.product_id?.code}</span>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'receipt_detail_id',
      render: (data) => <span>{data?.product_id?.name}</span>
    },
    {
      title: 'Ảnh',
      dataIndex: 'receipt_detail_id',
      render: (item) => {
        return (
          <Avatar
            shape="square"
            size="large"
            icon={<img alt="" src={getImage(item.thumbnail?.path)} />}
          />
        );
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: '20%',
      editable: true
    }
  ];
  const items = [
    {
      key: '1',
      label: 'Người nhập',
      span: 2,
      children: receiptDetail?.importer?.username
    },
    {
      key: '2',
      label: 'Ngày nhập kho',
      children: dayjs(receiptDetail?.import_date).format('DD/MM/YYYY')
    }
  ];
  const getDetailReceipt = async () => {
    const { payload } = await dispatch(getReceiptById(id));
    setReceiptDetail(payload);
  };
  useEffect(() => {
    if (id) {
      getDetailReceipt();
    }
  }, [id]);
  return (
    <>
      {receiptDetail && (
        <Modal
          title="Hóa đơn chi tiết"
          width="80vw"
          open={isModalOpen}
          footer={null}
          closeIcon={null}
          onCancel={handleCancel}>
          <Descriptions className="py-4" layout="vertical" items={items} />
          <Table
            columns={columns}
            rowKey="_id"
            dataSource={receiptDetail.list}
            bordered
            pagination={false}
          />
        </Modal>
      )}
    </>
  );
};
export default ModalReceiptDetail;
