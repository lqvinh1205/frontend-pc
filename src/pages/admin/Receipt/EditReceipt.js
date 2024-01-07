import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Upload, message, Avatar } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Brand.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editBrand, getBrandById } from './slice';
import { getImage } from '../../../ultils';

const { Title } = Typography;

const EditBrand = (props) => {
  const [fileList, setFileList] = useState(null);
  const [logo, setLogo] = useState(null);

  const dispath = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const onFinish = async (data) => {
    const dataReq = {
      id,
      images: data.images && data.images.length > 0 ? data.images[0].originFileObj : null,
      name: data.name
    };
    const res = await dispath(editBrand(dataReq));
    if (!res.error) {
      navigate('/admin/brand');
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const customRequest = (info) => {
    setFileList(info.file);
  };

  //call api
  const getBrand = async () => {
    const { payload } = await dispath(getBrandById(id));
    form.setFieldsValue(payload);
    setLogo(form.getFieldValue('logo').path);
  };

  useEffect(() => {
    getBrand();
  }, [id]);

  return (
    <>
      <Row className="flex">
        <Title level={2}>Chỉnh sửa thương hiệu</Title>
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

        {logo && (
          <Avatar
            className="mb-2"
            shape="square"
            size="large"
            icon={<img alt="" src={getImage(form.getFieldValue('logo').path)} />}
          />
        )}

        <Form.Item
          name="images"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="">
          <Upload name="logo" customRequest={customRequest} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <span className="pl-2">{fileList?.name}</span>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditBrand;
