import React, { useState } from 'react';
import { Form, Input, Button, Row, Upload } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Brand.css';
import { useDispatch } from 'react-redux';
import { createBrand } from './slice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AddBrand = (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState(null);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    const dataReq = {
      images: data?.images[0]?.originFileObj,
      name: data.name
    };
    const res = await dispath(createBrand(dataReq));
    if (!res.error) {
      navigate('/admin/brand');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const customRequest = ({ file, onError }) => {
    if (!file) {
      onError();
    }
    setFileList(file);
  };
  return (
    <>
      <Row className="flex">
        <Title level={2}>Thêm thương hiệu</Title>
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
          label="Name category"
          name="name"
          rules={[{ required: true, message: 'Xin hãy điền tên !' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
          rules={[{ required: true, message: 'Xin hãy chọn file !' }]}>
          <Upload name="logo" customRequest={customRequest} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <span className="pl-2">{fileList?.name}</span>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddBrand;
