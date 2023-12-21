import { Avatar, Button, Form, Input, Table, Typography } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { getImage } from '../../../ultils';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleRemove = (id) => {};
  const columns = [
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
      title: 'Giá',
      render: (_) => {
        return <span>{`${_.warranty_time} ${_.warranty_unit}`}</span>;
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity'
    },
    {
      title: 'Thành tiền',
      dataIndex: 'total'
    },
    {
      title: '',
      dataIndex: '_id',
      align: 'right',
      render: (id) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(id)}></Button>
      )
    }
  ];
  useEffect(() => {
    if (localStorage.getItem('carts')) {
      setProducts(JSON.parse(localStorage.getItem('carts')));
    }
  }, []);
  return (
    <div className="mx-auto my-2 flex w-full max-w-[1650px] flex-col gap-4">
      <div className="mt-2 flex items-center gap-3">
        <h1 className="text-[18px]">Giỏ hàng của tôi</h1>{' '}
        <button
          onClick={() => navigate('/')}
          className="rounded-[4px] bg-[#24aa98] px-[10px] py-[5px] text-white">
          Tiếp tục mua hàng
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Table
            columns={columns}
            dataSource={products}
            bordered
            pagination={{
              total: 10
            }}
          />
        </div>
        <div className="border border-[#de0b00]">
          <div className="bg-[#de0b00] p-3 text-[20px] text-white">Thông tin thanh toán</div>
          <div className="p-3">
            <p>Để tiếp tục đặt hàng, quý khách xin vui lòng nhập thông tin bên dưới.</p>
            <p className="mt-3">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản giao dịch của Phúc Anh.
            </p>
            <div className="mt-2">
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item
                  label={<p style={{ fontSize: '16px', fontWeight: 700 }}>Họ và tên</p>}
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<p style={{ fontSize: '16px', fontWeight: 700 }}>Số điện thoại</p>}
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>
                      Email (Vui lòng điền chính xác)
                    </p>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<p style={{ fontSize: '16px', fontWeight: 700 }}>Địa chỉ nhận hàng</p>}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<p style={{ fontSize: '16px', fontWeight: 700 }}>Ghi chú</p>}
                  name="note">
                  <TextArea />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="flex flex-col items-center bg-[#de0b00] p-3 text-[20px] text-white">
            <div>ĐẶT HÀNG</div>
            <div className="text-[14px]">Tư vấn viên sẽ gọi điện thoại xác nhận</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
