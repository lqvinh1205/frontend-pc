import { Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBill, getBill } from './slice';
import dayjs from 'dayjs';
import ModalBillDetail from '../../../components/admin/ModalBillDetail';
import { exportToExcel } from '../../../ultils';

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
  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc muốn xóa',
      onOk: () =>
        dispatch(deleteBill(id)).then((res) => {
          if (!res.error) {
            dispatch(getBill());
          }
        })
    });
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
      render: (text) => <a href="/">{text}</a>
    },
    {
      title: 'Người bán',
      dataIndex: 'sale_staff',
      render: (text) => <a href="/">{text?.username}</a>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status'
    },
    {
      title: 'Ngày bán',
      dataIndex: 'sale_date',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total'
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
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(id)}></Button>
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
      ['Thời gian', 'Tên khách hàng', 'Người bán', 'Tên hàng', 'Số lượng', 'Giá bán'],
      ...billDetail.flat().map((item) => {
        console.log(item);
        return [
          dayjs(item.bill.sale_date).format('DD/MM/YYYY'),
          item.bill.username,
          'Website',
          item.receipt.product_id[0]?.name,
          item.quantity,
          item.price
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
        title={() => <Typography.Title level={3}>Danh sách hóa đơn</Typography.Title>}
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
