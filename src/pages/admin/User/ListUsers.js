import { Button, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ListUsers = (props) => {
  // const users = useAppSelector((data) => data.user.values);
  // const dispath = useAppDispatch();

  const columns = [
    {
      title: 'Name Users',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Email',
      className: 'column-money',
      dataIndex: 'email'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (text) => (text === 1 ? 'Admin' : 'Member')
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/users/${id}/edit`}>
            <Button type="primary" icon={<EditOutlined />}></Button>
          </Link>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => {}}></Button>
        </Row>
      )
    }
  ];

  useEffect(() => {
    // dispath(getUsers());
  }, []);
  return (
    <>
      <Row className="mb-3">
        <Link to="/admin/users/add">
          <Button type="primary">Add User</Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={[]}
        bordered
        title={() => <Typography.Title level={3}>List Users</Typography.Title>}
        pagination={{
          total: 10,
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 6, 7]
        }}
      />
    </>
  );
};

export default ListUsers;
