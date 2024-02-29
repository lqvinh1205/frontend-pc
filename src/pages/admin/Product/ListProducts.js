import { Avatar, Button, Row, Select, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, getProduct } from './slice';
import { getImage } from '../../../ultils';

const ListProducts = (props) => {
  const products = useSelector((data) => data.product.list);
  const total = useSelector((data) => data.product.total);
  const dispatch = useDispatch();

  const handleChangeStatus = async (data, { _id: id }) => {
    const { payload } = await dispatch(
      editProduct({
        id: id,
        formData: {
          is_deleted: data
        }
      })
    );
    if (payload?.message === 'success') {
      await dispatch(getProduct());
    }
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
        return <span>{`${_.warranty_time} ${_.warranty_unit}`}</span>;
      }
    },
    {
      title: 'Nhà bảo hành',
      dataIndex: 'warranty_time'
    },
    {
      title: 'Trạng thái',
      width: '10%',
      dataIndex: 'quantity_in_stock',
      render: (data) => (
        <div>
          {data > 0 ? (
            <span className="text-green-700">Còn hàng</span>
          ) : (
            <span className="text-red-700">Hết hàng</span>
          )}
        </div>
      )
    },
    {
      title: 'Action',
      align: 'center',
      render: (product) => (
        <div className="flex  justify-end gap-2">
          <Select
            defaultValue={product.is_deleted}
            onChange={(val) => handleChangeStatus(val, product)}
            options={[
              {
                value: false,
                label: 'Đang bán'
              },
              {
                value: true,
                label: 'Dừng bán'
              }
            ]}
            className="flex-1"
          />
          <Link to={`/admin/products/${product._id}/edit`} className="flex">
            <Button type="primary" className="bg-[#1677ff]" icon={<EditOutlined />}></Button>
          </Link>
        </div>
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
        dataSource={products.length > 0 ? products : []}
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
