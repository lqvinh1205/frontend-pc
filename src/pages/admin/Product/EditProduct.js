import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Select, Upload } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddProduct.css';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;
// const formRef = React.createRef<FormInstance>();

const EditProduct = (props) => {
  // goi function tu store
  // const product = useAppSelector((data) => data.product.valueOne);
  // const dispath = useAppDispatch();
  const [form] = Form.useForm();
  const formRef = React.createRef();
  //lay id tu url
  const { id } = useParams();

  //call api
  useEffect(() => {
    const getProduct = async () => {
      try {
        // const { payload } = await dispath(readProduct(id));
        // console.log(payload);
        // form.setFieldsValue(payload);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const onFinish = (product) => {
    // dispath(updateProduct({ id, ...product }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // code select
  const onGenderChange = (value) => {
    // switch (value) {
    //   case "male":
    //     formRef.current!.setFieldsValue({ note: "Hi, man!" });
    //     return;
    //   case "female":
    //     formRef.current!.setFieldsValue({ note: "Hi, lady!" });
    //     return;
    //   case "other":
    //     formRef.current!.setFieldsValue({ note: "Hi there!" });
    // }
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <>
      <Row className="flex justify-center">
        <Title level={2}>Fill add products</Title>
      </Row>
      <Form
        name="basic"
        labelCol={{ span: 8, offset: 4 }}
        wrapperCol={{ span: 16, offset: 4 }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-add-product"
        form={form}>
        <Form.Item
          label="Name product"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Name" value={'adad'} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input your price!' }]}>
          <Input placeholder="Price" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item label="Speed (Km/h)" name="speed">
          <Input placeholder="Speed" />
        </Form.Item>

        <Form.Item label="Technology" name="technology">
          <Input placeholder="Technology" />
        </Form.Item>

        <Form.Item label="Boost (s)/100Km/h " name="boost">
          <Input placeholder="3.7" />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select a option" onChange={onGenderChange} allowClear>
            <Option value="6232aab320971c171e8fb8a0">Tesla</Option>
            <Option value="62460a38c2b69977c07a816a">Lamborghini</Option>
            <Option value="62460a0ec2b69977c07a8158">Audi</Option>
            <Option value="62470531c2b69977c07a98fd">Porche</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="images"
          label="Upload"
          valuePropName=""
          getValueFromEvent={normFile}
          extra="">
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProduct;
