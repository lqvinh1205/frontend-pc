import { Avatar, Button, Form, Input, Modal, Table, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { getImage } from '../../../ultils';
import { DeleteOutlined, MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
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
        sale_staff:
          JSON.parse(localStorage.getItem('user'))?.user.role == 2
            ? JSON.parse(localStorage.getItem('user'))?.user?._id
            : null,
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
      render: (_) => (
        <Link to={`/products/${_._id}`}>
          {_.name.length > 50 ? `${_.name.substring(0, 50)}...` : _.name}
        </Link>
      )
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
    <div className="mx-auto my-2 flex w-full max-w-[1650px] flex-col gap-4 px-2">
      <div className="mt-2 flex items-center gap-3">
        <h1 className="text-[16px] sm:text-[18px]">Giỏ hàng của tôi</h1>{' '}
        <button
          onClick={() => navigate('/')}
          className="rounded-[4px] bg-[#24aa98] px-[10px] py-[5px] text-[13px] text-white sm:text-[14px]">
          Tiếp tục mua hàng
        </button>
      </div>
      <div className="grid sm:gap-4 lg:grid-cols-3">
        <div className="overflow-x-auto lg:col-span-2">
          <Table
            size="small"
            columns={columns}
            dataSource={products}
            bordered
            pagination={{
              total: 10
            }}
            className="min-w-full whitespace-nowrap lg:w-full xl:w-full"
          />
        </div>
        <div className="border border-[#de0b00]">
          <div className="bg-[#de0b00] p-3 text-[18px] text-white sm:text-[20px]">
            Thông tin thanh toán
          </div>
          <div className="p-3 text-[13px] sm:text-[14px]">
            <p>Để tiếp tục đặt hàng, quý khách xin vui lòng điền thông tin bên dưới.</p>
            <p className="mt-3 text-[13px] sm:text-[14px]">
              Bằng cách đặt hàng, bạn đồng ý với Điều khoản giao dịch của Phúc Anh.
            </p>
            <div className="mt-2">
              <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                initialValues={JSON.parse(localStorage.getItem('user'))?.user}
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
            className="flex cursor-pointer flex-col items-center bg-[#de0b00] p-3 text-[18px] text-white sm:text-[20px]"
            onClick={() => form.submit()}>
            <div>ĐẶT HÀNG</div>
            <div className="text-[13px] sm:text-[14px]">Tư vấn viên sẽ gọi điện thoại xác nhận</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
