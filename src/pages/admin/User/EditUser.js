import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Select, Upload, DatePicker, message } from 'antd';
import { Typography } from 'antd';
import './AddUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editUser, getUserById } from './slice';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const EditUser = (props) => {
  const dispath = useDispatch();

  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const onFinish = async (user) => {
    const res = await dispath(editUser({ id, ...user }));
    if (!res.error) {
      navigate('/admin/users');
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };
  const getUser = async () => {
    const { payload } = await dispath(getUserById(id));
    payload.date_of_birth = dayjs(payload.date_of_birth);
    form.setFieldsValue(payload);
  };
  useEffect(() => {
    getUser();
  }, [id]);
  return (
    <>
      <Row className="flex">
        <Title level={2}>Cập nhật người dùng</Title>
      </Row>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-add-product">
        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[{ required: true, message: 'Xin hãy điền tên !' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Xin hãy điền email !' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}>
          <Input placeholder="username@gmail.com" />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone_number"
          rules={[{ required: true, message: 'Xin hãy điền  số điện thoại !' }]}>
          <Input placeholder="0982882122" />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="date_of_birth"
          rules={[{ required: true, message: 'Xin hãy điền  ngày sinh!' }]}>
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Xin hãy điền  địa chỉ !' }]}>
          <Input placeholder="Ha noi" />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: 'Xin hãy điền  vai trò !' }]}>
          <Select>
            <Option value={1}>Người quản trị</Option>
            <Option value={2}>Nhân viên</Option>
            <Option value={3}>Khách hàng</Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
