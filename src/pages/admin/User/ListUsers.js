import { Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from './slice';
import dayjs from 'dayjs';

const listRole = {
  1: 'Ngưởi quản trị',
  2: 'Nhân viên',
  3: 'Khách hàng'
};

const ListUsers = (props) => {
  const users = useSelector((state) => state.user?.list);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc muốn xóa',
      onOk: () =>
        dispatch(deleteUser(id)).then((res) => {
          if (!res.error) {
            dispatch(getUser());
          }
        })
    });
  };

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Email',
      className: 'column-money',
      dataIndex: 'email'
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone_number'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      render: (date) => dayjs(date).format('DD/MM/YYYY')
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      render: (role) => listRole[role]
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/users/${id}/edit`}>
            <Button className="bg-[#1677ff]" type="primary" icon={<EditOutlined />}></Button>
          </Link>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemove(id)}></Button>
        </Row>
      )
    }
  ];

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="list-brand">
      <Row className="mb-3">
        <Link to="/admin/users/add">
          <Button type="primary" className="bg-[#1677ff]">
            Thêm người dùng
          </Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={users}
        bordered
        title={() => <Typography.Title level={3}>List Catgory</Typography.Title>}
        pagination={{
          total: users?.lenght
        }}
      />
    </div>
  );
};

export default ListUsers;
