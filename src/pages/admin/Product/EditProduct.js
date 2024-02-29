import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Select, Upload, Col, Modal, Avatar, Space, Card } from 'antd';
import { Typography } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import './AddProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createFormData, getImage } from '../../../ultils';
import { editProduct, getProductById } from './slice';
import TextArea from 'antd/es/input/TextArea';
import { getBrand } from '../Brand/slice';
import { getConfiguage } from '../Configuage/slice';

const { Title } = Typography;

const EditProduct = (props) => {
  const dispath = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [idsDelete, setIdsDelete] = useState([]);
  const [config, setConfig] = useState([]);

  const { id } = useParams();
  const brands = useSelector((state) => state.brand?.list);

  const onFinish = async (data) => {
    data.ids_delete = idsDelete;
    data.config = JSON.stringify(
      data.configuage.reduce((accumulator, currentObject) => {
        accumulator[currentObject._id] = currentObject;
        return accumulator;
      }, {})
    );
    const formData = createFormData(data);
    const res = await dispath(
      editProduct({
        id,
        formData
      })
    );
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
      setFileList((prevList) => [...prevList, file]);
      onSuccess();
    };
    reader.readAsDataURL(file);
  };
  const normFile = (e) => {
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
  const getProduct = async () => {
    await dispath(getBrand());
    let { payload } = await dispath(getProductById(id));
    payload.brand_id = payload.brand_id._id;
    payload.images = payload.images?.map((item) => ({
      _id: item._id,
      uid: item._id,
      percent: 50,
      name: 'image.png',
      status: 'done',
      url: getImage(item.path)
    }));
    setThumbnail(payload.thumbnail?.path);
    delete payload.thumbnail;
    if (payload?.config && Object.keys(payload?.config).length !== 0) {
      setConfig(
        Object.keys(JSON.parse(payload.config)).map((item) => JSON.parse(payload.config)[item])
      );
    } else {
      const { payload } = await dispath(getConfiguage());
      setConfig(payload.data);
    }
    form.setFieldsValue(payload);
  };
  const onRemove = (item) => {
    if (item._id) {
      setIdsDelete((prev) => [...prev, item._id]);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    form.setFieldsValue({ configuage: config });
  }, [config]);

  return (
    <>
      <Row className="flex">
        <Title level={2}>Chỉnh sửa sản phẩm</Title>
      </Row>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="form-add-product flex flex-col"
        onValuesChange={calculatePrice}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Xin hãy điền tên sản phẩm !' }]}>
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mã sản phẩm"
              name="code"
              rules={[{ required: true, message: 'Xin hãy điền mã code !' }]}>
              <Input placeholder="code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price_root"
              rules={[{ required: true, message: 'Xin hãy điền giá gốc !' }]}>
              <Input placeholder="price_root" suffix="VND" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Xin hãy điền giảm giá !' }]}>
              <Input placeholder="Discount" suffix="%" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Giá cuối"
              name="price"
              rules={[{ required: true, message: 'Xin hãy điền giá cuối !' }]}>
              <Input placeholder="price" suffix="VND" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nhà bảo hành"
              name="warranty_house"
              rules={[{ required: true, message: 'Xin hãy điền  nhà bảo hành !' }]}>
              <Input placeholder="Nhà bảo hành" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Thời gian bảo hành"
              name="warranty_time"
              rules={[{ required: true, message: 'Xin hãy điền thời gian bảo hành !' }]}>
              <Input placeholder="Thời gian bảo hành" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Đơn vị bảo hành"
              name="warranty_unit"
              rules={[{ required: true, message: 'Xin hãy điền đơn vị bảo hành !' }]}>
              <Select
                options={[
                  { value: 'Tháng', label: 'Tháng' },
                  { value: 'Năm', label: 'Năm' }
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
              rules={[{ required: true, message: 'Xin hãy điền nhà cung cấp !' }]}>
              <Input placeholder="Nhà cung cấp" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thương hiệu"
              name="brand_id"
              rules={[{ required: true, message: 'Xin hãy điền thương hiệu !' }]}>
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
        {thumbnail && (
          <img
            className="mb-2 max-h-[150px] max-w-[150px] object-contain"
            alt=""
            src={getImage(thumbnail)}
          />
        )}
        <Form.Item
          name="thumbnail"
          label="Ảnh chính"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="">
          <Upload
            name="thumbnail"
            customRequest={({ file, onError }) => {
              if (!file) {
                onError();
              }
              setFile(file);
            }}
            maxCount={1}
            showUploadList={false}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
            <span className="pl-2">{file?.name}</span>
          </Upload>
        </Form.Item>
        <div>
          <Form.Item
            name="images"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="">
            <Upload
              name="images"
              customRequest={customRequest}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={onRemove}>
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <Row gutter={16}>
          <Form.List name="configuage" className="flex flex-wrap">
            {(fields) => (
              <Col span={12} style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                {fields?.map((field, indexx) => (
                  <Card size="small" title={`Cấu hình ${field.name + 1}`} key={indexx}>
                    <Form.Item
                      label="Tên cấu hình"
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: 'Xin hãy điền tên !' }]}>
                      <Input disabled />
                    </Form.Item>
                    {/* Nest Form.List */}
                    <Form.Item label="Cấu hình chi tiết">
                      <Form.List name={[field.name, 'list']}>
                        {(subFields) => (
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            className="first:mt-2">
                            {subFields.map((subField, idx) => (
                              <Space key={idx}>
                                <Form.Item label="Tiêu đề" name={[subField.name, 'name']}>
                                  <Input placeholder="tiêu đề" disabled />
                                </Form.Item>
                                <Form.Item label="Nội dung" name={[subField.name, 'value']}>
                                  <Input placeholder="nội dung" />
                                </Form.Item>
                              </Space>
                            ))}
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
              </Col>
            )}
          </Form.List>
        </Row>
        <Form.Item wrapperCol={{ span: 8 }} className="mt-2">
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProduct;
