import { Avatar, Button, Form, Input, Modal, Table, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { getImage } from '../../../ultils';
import { DeleteOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postCartProducts } from './slice';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let carts = localStorage.getItem('carts');
    carts = JSON.parse(carts);
    if (carts.length > 0) {
      const dataReq = {
        ...values,
        carts: JSON.parse(localStorage.getItem('carts'))
      };
      const { payload } = await dispatch(postCartProducts(dataReq));
      if (payload) {
        localStorage.removeItem('carts');
        setProducts([]);
        message.success('Đặt hàng thành công!');
        form.setFieldsValue({
          username: '',
          email: '',
          phone_number: '',
          address: '',
          note: ''
        });
      }
    } else {
      message.warning('Giỏ hàng trống');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const changeQuantity = (id, type) => {
    let carts = localStorage.getItem('carts');
    carts = JSON.parse(carts);
    if (carts.length > 0) {
      const productIdx = carts.findIndex((item) => item._id == id);
      if (productIdx !== -1) {
        switch (type) {
          case 'increment':
            carts[productIdx]['quantity']++;
            localStorage.setItem('carts', JSON.stringify(carts));
            setProducts(carts);
            break;
          case 'decrement':
            if (carts[productIdx]['quantity'] > 1) {
              carts[productIdx]['quantity']--;
              localStorage.setItem('carts', JSON.stringify(carts));
              setProducts(carts);
            } else {
              Modal.confirm({
                title: 'Thông báo',
                content: 'Bạn có chắc muốn xóa',
                onOk: () => {
                  carts.splice(productIdx, 1);
                  localStorage.setItem('carts', JSON.stringify(carts));
                  setProducts(carts);
                }
              });
            }
            break;
          default:
            break;
        }
      }
    }
  };
  const handleRemove = (id) => {
    let carts = localStorage.getItem('carts') || [];
    if (carts.length > 0) {
      carts = JSON.parse(carts);
      const productIdx = carts.findIndex((item) => item._id == id);
      if (productIdx !== -1) {
        Modal.confirm({
          title: 'Thông báo',
          content: 'Bạn có chắc muốn xóa',
          onOk: () => {
            carts.splice(productIdx, 1);
            localStorage.setItem('carts', JSON.stringify(carts));
            setProducts(carts);
          }
        });
      }
    }
  };
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
        return (
          <div className="flex justify-between">
            <span className="line-through">{`${_.price_root}`} VND</span>
            <span className="text-red-600">{`${_.price}`} VND</span>
          </div>
        );
      }
    },
    {
      title: 'Số lượng',
      render: (_) => {
        return (
          <div className="flex gap-2">
            <MinusSquareOutlined
              className="cursor-pointer"
              onClick={() => changeQuantity(_._id, 'decrement')}
            />
            <span>{_.quantity}</span>
            <PlusSquareOutlined
              className="cursor-pointer"
              onClick={() => changeQuantity(_._id, 'increment')}
            />
          </div>
        );
      }
    },
    {
      title: 'Thành tiền',
      render: (_) => {
        return (
          <div className="flex justify-between">
            <span className="text-red-600">{`${_.price * _.quantity}`} VND</span>
          </div>
        );
      }
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
            <p>Để tiếp tục đặt hàng, quý khách xin vui lòng điền thông tin bên dưới.</p>
            <p className="mt-3">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản giao dịch của Phúc Anh.
            </p>
            <div className="mt-2">
              <Form
                form={form}
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
                      message: 'Xin hãy điền tên !'
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
                      message: 'Xin hãy điền số điện thoại!'
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
                      type: 'email',
                      message: 'Email không hợp lệ!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label={<p style={{ fontSize: '16px', fontWeight: 700 }}>Địa chỉ nhận hàng</p>}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: 'Xin hãy điền  địa chỉ !'
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
          <div
            className="flex cursor-pointer flex-col items-center bg-[#de0b00] p-3 text-[20px] text-white"
            onClick={() => form.submit()}>
            <div>ĐẶT HÀNG</div>
            <div className="text-[14px]">Tư vấn viên sẽ gọi điện thoại xác nhận</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
