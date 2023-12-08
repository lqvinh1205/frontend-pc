import React from 'react';
import { Form, Input, Button, Row, Upload, message } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddBrand.css';
import { useDispatch } from 'react-redux';
import { createBrand } from './slice';
import { createImage } from '../../../stores/slice/images';

const { Title } = Typography;

const AddBrand = (props) => {
  const dispath = useDispatch();
  const onFinish = async (cate) => {
    // cate.images = cate.images[0];
    console.log(cate);
    // dispath(createBrand(cate));
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e && e.fileList);
    return e && e.fileList;
  };
  const customRequest = ({ file, onSuccess, onError }) => {
    // const isImage = file.type.startsWith('image/');
    // if (!isImage) {
    //   message.error('Vui lòng chỉ tải lên file hình ảnh!');
    //   onError();
    // }
    // onSuccess();
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = dispath(createImage(file));
      onSuccess(response);
    } catch (error) {
      console.error('Upload failed:', error);
      onError(error);
    }
  };
  return (
    <>
      <Row className="flex">
        <Title level={2}>Thêm thương hiệu</Title>
      </Row>
      <Form
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
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload"
          valuePropName=""
          getValueFromEvent={normFile}
          extra="">
          <Upload name="logo" customRequest={customRequest} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
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
