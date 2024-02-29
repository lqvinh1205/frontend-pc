import { Button, Row, Select, Table, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { editBill, getBill } from './slice';
import dayjs from 'dayjs';
import ModalBillDetail from '../../../components/admin/ModalBillDetail';
import { exportToExcel } from '../../../ultils';

const statusBill = {
  1: 'Đang chờ',
  2: 'Hủy bỏ',
  3: 'Thành công'
};
const ListBills = (props) => {
  const bills = useSelector((data) => data.bill.list);
  const total = useSelector((data) => data.bill.total);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const hanldeShowModal = (id) => {
    showModal();
    setId(id);
  };
  const handleChangeStatus = async (val, { _id: id }) => {
    const { payload } = await dispatch(
      editBill({
        id,
        data: {
          status: Number(val)
        }
      })
    );
    if (payload?.message === 'success') {
      await dispatch(getBill());
    }
  };
  const columns = [
    {
      title: 'Mã hóa đơn',
      className: 'column-money',
      dataIndex: 'code'
    },
    {
      title: 'Người mua',
      dataIndex: 'username',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Người bán',
      dataIndex: 'sale_staff',
      render: (staff) => <span>{staff[0]?.username}</span>
    },
    {
      title: 'Ngày bán',
      dataIndex: 'sale_date',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Trạng thái',
      width: '7%',
      render: (data) => (
        <Select
          className="w-full"
          defaultValue={Number(data.status)}
          onChange={(val) => handleChangeStatus(val, data)}
          options={[
            {
              value: 1,
              label: 'Đang chờ'
            },
            {
              value: 2,
              label: 'Thành Công'
            },
            {
              value: 3,
              label: 'Hủy bỏ'
            }
          ]}
        />
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      render: (item) => (
        <span>
          {item.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}
        </span>
      )
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <div>
            <Button
              onClick={() => hanldeShowModal(id)}
              type="primary"
              className="bg-[#1677ff]"
              icon={<EyeOutlined />}></Button>
          </div>
        </Row>
      )
    }
  ];

  const exportToExcelReceipt = () => {
    const billDetail = bills.map((bill) => {
      if (bill.hasOwnProperty('list')) {
        const { list, ...billWithoutList } = bill;
        return list.map((item) => ({
          ...item,
          bill: billWithoutList
        }));
      }
      return [];
    });

    const data = [
      [
        'Mã hóa đơn',
        'Thời gian',
        'Tên khách hàng',
        'Người bán',
        'Tên hàng',
        'Số lượng',
        'Giá bán',
        'Trạng thái'
      ],
      ...billDetail.flat().map((item) => {
        return [
          item.bill.code,
          dayjs(item.bill.sale_date).format('DD/MM/YYYY'),
          item.bill.username,
          'Website',
          item.receipt.product_id[0]?.name,
          item.quantity,
          item.price,
          statusBill[item.bill.status]
        ];
      })
    ];
    exportToExcel(data);
  };

  useEffect(() => {
    dispatch(getBill());
  }, []);
  return (
    <>
      <Row className="mb-3 justify-end">
        <Button type="primary" className="bg-[#1677ff]" onClick={exportToExcelReceipt}>
          Xuất báo cáo
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={bills.length > 0 ? bills : []}
        rowKey="_id"
        bordered
        title={() => <Typography.Title level={3}>Danh sách đơn hàng</Typography.Title>}
        pagination={{
          total: total
        }}
      />
      {isModalOpen && (
        <ModalBillDetail
          id={id}
          isModalOpen={isModalOpen}
          showModal={showModal}
          handleCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ListBills;
