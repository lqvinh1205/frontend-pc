import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Select, Upload, Col, Modal } from 'antd';
import { Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './AddProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { getBrand } from '../Brand/slice';
import { createProduct } from './slice';

const { Title } = Typography;

const AddProduct = (props) => {
  const dispath = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const brands = useSelector((state) => state.brand?.list);

  const onFinish = async (data) => {
    const dataReq = {
      images: data?.images[0]?.originFileObj,
      name: data.name
    };
    console.log(data);
    const res = await dispath(createProduct(data));
    if (!res.error) {
      navigate('/admin/products');
    }
  };

  const customRequest = ({ onSuccess, file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setFileList((prevFileList) => [
        ...prevFileList,
        {
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: imageUrl
        }
      ]);
      onSuccess();
    };
    reader.readAsDataURL(file);
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList ? e.fileList : [];
  };
  const handleCancel = () => setPreviewOpen(false);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </div>
  );
  const initialValues = {
    price_root: 0,
    discount: 0,
    price: 0,
    warranty_time: 12,
    warranty_unit: 1
  };
  const calculatePrice = (changedValues, allValues) => {
    if ('price_root' in changedValues || 'discount' in changedValues) {
      if (Number(allValues.discount) > 0) {
        form.setFieldsValue({
          price: (allValues.price_root / 100) * Number(allValues.discount)
        });
      } else {
        form.setFieldsValue({
          price: allValues.price_root
        });
      }
    }
  };
  useEffect(() => {
    dispath(getBrand());
  }, []);
  return (
    <>
      <Row className="flex">
        <Title level={2}>Thêm sản phẩm</Title>
      </Row>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="form-add-product flex flex-col"
        initialValues={initialValues}
        onValuesChange={calculatePrice}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Please input your name product!' }]}>
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mã sản phẩm"
              name="code"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price_root"
              rules={[{ required: true, message: 'Please input your price!' }]}>
              <Input placeholder="price_root" suffix="VND" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Please input your discount!' }]}>
              <Input placeholder="Discount" suffix="%" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Giá cuối"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}>
              <Input placeholder="price" suffix="VND" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhà bảo hành"
              name="warranty_house"
              rules={[{ required: true, message: 'Please input your warranty house!' }]}>
              <Input placeholder="Nhà bảo hành" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Thời gian bảo hành"
              name="warranty_time"
              rules={[{ required: true, message: 'Please input your warranty time!' }]}>
              <Input placeholder="Thời gian bảo hành" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Đơn vị bảo hành"
              name="warranty_unit"
              rules={[{ required: true, message: 'Please input your warranty unit!' }]}>
              <Select
                options={[
                  { value: 1, label: 'Tháng' },
                  { value: 2, label: 'Năm' }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhà cung cấp"
              name="supplier"
              rules={[{ required: true, message: 'Please input your supplier!' }]}>
              <Input placeholder="Nhà cung cấp" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thương hiệu"
              name="brand_id"
              rules={[{ required: true, message: 'Please input your brand!' }]}>
              <Select
                options={brands.map((item) => ({
                  value: item._id,
                  label: item.name
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Mô tả" name="description">
          <TextArea placeholder="description" />
        </Form.Item>
        <div>
          <Form.Item
            name="images"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
            rules={[{ required: true, message: 'Please input your file!' }]}>
            <Upload
              customRequest={customRequest}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}>
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <Form.Item wrapperCol={{ span: 8 }}>
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProduct;
