import React from 'react';
import './Signin.css';
import { Form, Input, Checkbox, Typography, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAuth } from '../slice';
const { Text } = Typography;

const Signin = (props) => {
  const dispatch = useDispatch();
  // const isSignin = useAppSelector((state) => state.auth.isSignin);
  const navigate = useNavigate();

  const onFinish = async (user) => {
    try {
      const { payload } = await dispatch(loginAuth(user));
      if (payload?.message === 'success') {
        localStorage.setItem('user', JSON.stringify(payload.data));
        navigate('/admin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="signin-main bg-dark pt-28">
      <Row className="form-signin justify-center">
        <Col span={18}>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được bỏ trống!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Password không được để trống!' },
                { min: 6, message: 'Tối thiểu 6 ký tự' }
              ]}>
              <Input.Password />
            </Form.Item>

            <Row className="mb-1">
              <Col span={8}>
                <Text className="have-account">
                  You have account?
                  <Link to="/signup" className="pl-2">
                    Sign-up
                  </Link>
                </Text>
              </Col>
            </Row>

            <Form.Item valuePropName="checked" wrapperCol={{ span: 18 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 18 }}>
              <button
                type="submit"
                className="h-[34px] rounded-[4px] border bg-[#dd0000] px-[5px] text-[14px] text-white">
                Đăng nhập
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
