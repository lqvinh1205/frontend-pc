import { Avatar, Button, Modal, Row, Table, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteBrand, getBrand } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import './Brand.css';
import { getImage } from '../../../ultils';

const ListBrand = (props) => {
  const brands = useSelector((state) => state.brand?.list);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Thông báo',
      content: 'Bạn có chắc muốn xóa',
      onOk: () =>
        dispatch(deleteBrand(id)).then((res) => {
          if (!res.error) {
            dispatch(getBrand());
          }
        })
    });
  };

  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      render: (item) => {
        return (
          <Avatar shape="square" size="large" icon={<img alt="" src={getImage(item.path)} />} />
        );
      }
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      render: (text) => <div style={{ display: 'flex', flex: 1 }}>{text}</div>
    },
    {
      title: 'Action',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Row className="flex justify-end gap-2">
          <Link to={`/admin/brand/${id}/edit`}>
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
    dispatch(getBrand());
  }, []);

  return (
    <div className="list-brand">
      <Row className="mb-3">
        <Link to="/admin/brand/add">
          <Button type="primary" className="bg-[#1677ff]">
            Thêm thương hiệu
          </Button>
        </Link>
      </Row>
      <Table
        columns={columns}
        dataSource={brands}
        bordered
        title={() => <Typography.Title level={3}>Danh sách thương hiệu</Typography.Title>}
        pagination={{
          total: brands?.lenght
        }}
      />
    </div>
  );
};

export default ListBrand;
