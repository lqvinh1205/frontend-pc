import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Card } from 'antd';
import { Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './Configuage.css';
import { useDispatch } from 'react-redux';
import { editConfiguage, getConfiguage } from './slice';

const { Title } = Typography;

const SettingConfiguage = (props) => {
  const [form] = Form.useForm();
  const dispath = useDispatch();

  const onFinish = async (data) => {
    await dispath(editConfiguage(data));
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };
  const getConfiguageSetting = async () => {
    const { payload } = await dispath(getConfiguage());
    form.setFieldsValue({
      configuage: payload.data
    });
  };
  useEffect(() => {
    getConfiguageSetting();
  }, []);

  return (
    <>
      <Row className="flex">
        <Title level={2}>Cài đặt cấu hình</Title>
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
        <Form.List name="configuage">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Cấu hình ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }>
                  <Form.Item
                    label="Tên cấu hình"
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Xin hãy điền tên !' }]}>
                    <Input />
                  </Form.Item>

                  {/* Nest Form.List */}
                  <Form.Item label="Cấu hình chi tiết">
                    <Form.List name={[field.name, 'list']}>
                      {(subFields, subOpt) => (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {subFields.map((subField, idx) => (
                            <div className="flex flex-wrap gap-4" key={idx}>
                              <Form.Item
                                className="flex-1 pl-4"
                                label="Tiêu đề"
                                name={[subField.name, 'name']}
                                rules={[{ required: true, message: 'Xin hãy điền tên !' }]}>
                                <Input placeholder="" />
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                                className="pt-2"
                              />
                            </div>
                          ))}
                          <Button type="dashed" onClick={() => subOpt.add()} block>
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ span: 8 }} className="mt-3">
          <Button type="primary" htmlType="submit" className="bg-[#1677ff]">
            Thay đổi
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SettingConfiguage;
