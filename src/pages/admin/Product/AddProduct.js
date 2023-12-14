import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Select, Upload, Col, Modal } from 'antd';
import { Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './AddProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { getBrand } from '../Brand/slice';

const { Title } = Typography;
const { Option } = Select;

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
    // const res = await dispath(createBrand(dataReq));
    // if (!res.error) {
    //   navigate('/admin/brand');
    // }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const customRequest = ({ file, onError }) => {
    if (!file) {
      onError();
    }
    setFileList(file);
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
        <Title level={2}>Thêm thương hiệu</Title>
      </Row>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-add-product flex flex-col"
        initialValues={initialValues}
        onValuesChange={calculatePrice}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ten san pham"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ma san pham"
              name="code"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Gia"
              name="price_root"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="price_root" suffix="VND" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Giam gia"
              name="discount"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="price_root" suffix="%" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Gia cuoi"
              name="price"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="price" suffix="VND" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nha bao hanh"
              name="warranty_unit"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="description" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Thoi gian bao hanh"
              name="warranty_time"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="description" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Don vi bao hanh"
              name="warranty_unit"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Select
                options={[
                  { value: 1, label: 'Thang' },
                  { value: 2, label: 'Nam' }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nha cung cap"
              name="supplier"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Input placeholder="description" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thuong hieu"
              name="brand_id"
              rules={[{ required: true, message: 'Please input your code!' }]}>
              <Select
                options={brands.map((item) => ({
                  value: item._id,
                  label: item.name
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Mo ta"
          name="description"
          rules={[{ required: true, message: 'Please input your code!' }]}>
          <TextArea placeholder="description" />
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra=""
          rules={[{ required: true, message: 'Please input your file!' }]}>
          {/* <Upload name="logo" customRequest={customRequest} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <span className="pl-2">{fileList?.name}</span>
          </Upload> */}
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}>
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
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

export default AddProduct;
