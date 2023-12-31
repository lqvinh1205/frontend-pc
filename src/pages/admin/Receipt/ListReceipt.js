import { Avatar, Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteReceipt, getReceipt } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import './Receipt.css';
import { getImage } from '../../../ultils';
import ModalReceiptDetail from '../../../components/admin/ModalReceiptDetail';
import dayjs from 'dayjs';

const ListReceipt = (props) => {
  const receipts = useSelector((state) => state.receipt?.list);
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
        dispatch(deleteReceipt(id)).then((res) => {
          if (!res.error) {
            dispatch(getReceipt());
          }
        })
    });
  };

  const columns = [
    {
      title: 'Mã lô',
      dataIndex: 'code'
    },
    {
      title: 'Ngày nhập kho',
      dataIndex: 'import_date',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Người nhập kho',
      dataIndex: 'importer',
      render: (user) => <span>{user.username}</span>
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Button
          onClick={() => hanldeShowModal(id)}
          type="primary"
          className="bg-[#1677ff]"
          icon={<EyeOutlined />}></Button>
      )
    }
  ];

  useEffect(() => {
    dispatch(getReceipt());
  }, []);

  return (
    <>
      <div className="list-receipt">
        <Row className="mb-3">
          <Link to="add">
            <Button type="primary" className="bg-[#1677ff]">
              Tạo phiếu nhập kho
            </Button>
          </Link>
        </Row>
        <Table
          columns={columns}
          dataSource={receipts}
          bordered
          rowKey="_id"
          title={() => <Typography.Title level={3}>Danh sách phiếu nhập kho</Typography.Title>}
          pagination={{
            total: receipts?.lenght
          }}
        />
      </div>
      {isModalOpen && (
        <ModalReceiptDetail id={id} isModalOpen={isModalOpen} handleCancel={handleCancel} />
      )}
    </>
  );
};

export default ListReceipt;
