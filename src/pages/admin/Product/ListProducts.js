import { Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ListProducts = (props) => {
  // const products = useAppSelector((data) => data.product.values);
  // const dispath = useAppDispatch();

  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc muốn xóa',
      onOk: () => () => {}
    });
  };
  const columns = [
    {
      title: 'Name Product',
      dataIndex: 'name',
      render: (text) => <a href="/">{text}</a>
    },
    {
      title: 'Price',
      className: 'column-money',
      dataIndex: 'price'
    },
    {
      title: 'Technology',
      dataIndex: 'technology'
    },
    {
      title: 'Speed',
      dataIndex: 'speed'
    },
    {
      title: 'Boost',
      dataIndex: 'boost'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/products/${id}/edit`}>
            <Button type="primary" icon={<EditOutlined />}></Button>
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
    // dispath(listProduct());
  }, []);
  return (
    <>
      <Row className="mb-3">
        <Link to="/admin/products/add">
          <Button type="primary">Add Product</Button>
        </Link>
      </Row>

      <Table
        columns={columns}
        dataSource={[]}
        bordered
        title={() => <Typography.Title level={3}>List Products</Typography.Title>}
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

export default ListProducts;
