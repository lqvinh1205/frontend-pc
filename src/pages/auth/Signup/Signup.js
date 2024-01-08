import React from 'react';
import { useDispatch } from 'react-redux';
import './Signup.css';
import { Form, Input, Row, Col, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerAuth } from '../slice';

const Signup = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (user) => {
    try {
      const { payload } = await dispatch(registerAuth(user));
      if (payload?.message === 'success') {
        navigate('/signin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="signup-main pt-28">
      <Row className="form-signup justify-center">
        <Col span={18}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Tên không được để  trống!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password không được để  trống!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Sai định dạng email!'
                },
                {
                  required: true,
                  message: 'Email không được để trống!'
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Điện thoại"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại không được để  trống!'
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Địa chỉ không được để trống!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày sinh"
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: 'Ngày sinh không được để  trống!'
                }
              ]}>
              <DatePicker />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 18 }}>
              <button
                type="submit"
                className="h-[34px] rounded-[4px] border bg-[#dd0000] px-[5px] text-[14px] text-white">
                Đăng ký
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
