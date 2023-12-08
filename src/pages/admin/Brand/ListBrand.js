import { Button, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

const ListBrand = (props) => {
  // const category = useSelector((data) => data.category.values);
  const category = [];
  const dispath = useDispatch();
  const columns = [
    {
      title: 'Name Category',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Images',
      className: 'column-money',
      dataIndex: 'images'
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/category/${id}/edit`}>
            <Button type="primary" icon={<EditOutlined />}></Button>
          </Link>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => {}}></Button>
        </Row>
      )
    }
  ];

  useEffect(() => {
    // dispath(getCategory());
  }, []);
  return (
    <>
      <Row className="mb-3">
        <Link to="/admin/category/add">
          <Button type="primary" className="bg-[#1677ff]">
            Thêm thương hiệu
          </Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={category}
        bordered
        title={() => <Typography.Title level={3}>List Catgory</Typography.Title>}
        pagination={{
          total: category.lenght,
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 6, 7]
        }}
      />
    </>
  );
};

export default ListBrand;
