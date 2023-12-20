import { Avatar, Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct } from './slice';
import { getImage } from '../../../ultils';

const ListProducts = (props) => {
  const products = useSelector((data) => data.product.list);
  const total = useSelector((data) => data.product.total);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc muốn xóa',
      onOk: () =>
        dispatch(deleteProduct(id)).then((res) => {
          if (!res.error) {
            dispatch(getProduct());
          }
        })
    });
  };
  const columns = [
    {
      title: 'Mã code',
      className: 'column-money',
      dataIndex: 'code'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text) => <a href="/">{text}</a>
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      render: (item) => {
        return (
          <Avatar shape="square" size="large" icon={<img alt="" src={getImage(item?.path)} />} />
        );
      }
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price_root'
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount'
    },
    {
      title: 'Giá',
      dataIndex: 'price'
    },
    {
      title: 'Thời gian bảo hành',
      render: (_) => {
        console.log(_);
        return <span>{`${_.warranty_time} ${_.warranty_unit}`}</span>;
      }
    },
    {
      title: 'Nhà bảo hành',
      dataIndex: 'warranty_time'
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/products/${id}/edit`}>
            <Button type="primary" className="bg-[#1677ff]" icon={<EditOutlined />}></Button>
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
    dispatch(getProduct());
  }, []);
  return (
    <>
      <Row className="mb-3">
        <Link to="/admin/products/add">
          <Button type="primary" className="bg-[#1677ff]">
            Thêm sản phẩm
          </Button>
        </Link>
      </Row>

      <Table
        columns={columns}
        dataSource={products}
        bordered
        title={() => <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>}
        pagination={{
          total: total
        }}
      />
    </>
  );
};

export default ListProducts;
