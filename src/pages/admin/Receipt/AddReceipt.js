import { Avatar, Descriptions, Input, Table, AutoComplete, Button, Form, message, Row } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImage } from '../../../ultils';
import dayjs from 'dayjs';
import { DeleteOutlined } from '@ant-design/icons';
import { getProduct } from '../Product/slice';
import './Receipt.css';
import Title from 'antd/es/typography/Title';
import { createReceipt } from './slice';
import { useNavigate } from 'react-router-dom';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values
      });
    } catch (errInfo) {
      const values = form.getFieldsValue();
      toggleEdit();
      handleSave({
        ...record,
        ...values
      });
    }
  };
  let childNode = children;
  const validateNumber = (_, value, callback) => {
    if (value !== undefined && (isNaN(value) || value < 1)) {
      callback(`${title} là số nguyên dương`);
    } else {
      callback();
    }
  };
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} bắt buộc`
          },
          {
            validator: validateNumber
          }
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const AddReceipt = () => {
  const products = useSelector((data) => data.product.list);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listProduct, setListProduct] = useState([]);
  const handleRemove = (id) => {
    const res = listProduct.filter((item) => item._id !== id);
    setListProduct(res);
  };

  const isEqual = (obj1, obj2) => {
    return obj1._id === obj2._id;
  };
  const uniqueObjects = (array1, array2) => {
    const uniqueArray1 = array1.filter((obj1) => !array2.find((obj2) => isEqual(obj1, obj2)));
    const uniqueArray2 = array2.filter((obj2) => !array1.find((obj1) => isEqual(obj2, obj1)));
    return uniqueArray1.concat(uniqueArray2);
  };

  const defaultColumns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      render: (text) => <a href="/">{text}</a>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text) => <a href="/">{text}</a>
    },
    {
      title: 'Ảnh',
      render: (item) => {
        return (
          <Avatar
            shape="square"
            size="large"
            icon={<img alt="" src={getImage(item.thumbnail?.path)} />}
          />
        );
      }
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      editable: true,
      width: '20%',
      render: (text) => {
        return <span className="text-red-600">{`${text}`} VND</span>;
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: '20%',
      editable: true
    },
    {
      title: 'Action',
      align: 'end',
      dataIndex: '_id',
      render: (id) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(id)}></Button>
      )
    }
  ];

  const handleSave = (row) => {
    const newData = [...listProduct];
    const index = newData.findIndex((item) => row._id === item._id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setListProduct(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    };
  });

  const handleSubmit = async () => {
    if (listProduct.length === 0) {
      message.warning('Không có sản phẩm nào được chọn');
      return;
    }
    const isValidQuantity = listProduct.findIndex((item) => {
      return Number(item.quantity) === 0 || isNaN(Number(item.quantity));
    });
    if (isValidQuantity !== -1) {
      message.warning('Số  lượng sản phẩm không hợp lệ');
      return;
    }
    const { payload } = await dispatch(
      createReceipt({
        importer: '6568a322e1dd50d48c30693d',
        products: listProduct
      })
    );
    if (payload?.message === 'success') {
      navigate('/admin/receipt');
    }
  };

  const handleSearch = (value) => {
    let res = [];
    if (value) {
      res = uniqueObjects(products, listProduct)
        .filter((item) => {
          return (
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.code.toLowerCase().includes(value.toLowerCase())
          );
        })
        .map((product) => ({
          value: product.name,
          label: (
            <div>
              <strong>{product.code}</strong> - {product.name}
            </div>
          ),
          key: product._id,
          product
        }));
    }
    setOptions(res);
  };
  const handleSelect = (value, option) => {
    setListProduct((prev) => [
      ...prev,
      {
        ...option.product,
        quantity: 1
      }
    ]);
    setInputValue('');
    setOptions([]);
  };
  const items = [
    {
      key: '1',
      label: 'Người nhập',
      span: 2,
      children: 'le vinh'
    },
    {
      key: '2',
      label: 'Ngày nhập kho',
      children: dayjs().format('DD/MM/YYYY')
    },
    {
      key: '3',
      label: 'Tìm kiếm sản phẩm',
      span: 3,
      children: (
        <>
          <AutoComplete
            value={inputValue}
            onSearch={handleSearch}
            options={options}
            onSelect={handleSelect}>
            <Input.Search
              onChange={(e) => setInputValue(e.target.value)}
              size="large"
              placeholder="input here"
            />
          </AutoComplete>
        </>
      )
    }
  ];

  useEffect(() => {
    dispatch(getProduct());
  }, []);
  return (
    <>
      <Row className="flex">
        <Title level={2}>Tạo phiếu nhập kho</Title>
      </Row>
      <Descriptions className="py-4" layout="vertical" items={items} />
      <Table
        columns={columns}
        components={components}
        rowClassName={() => 'editable-row'}
        rowKey="_id"
        dataSource={listProduct}
        bordered
        pagination={false}
      />
      <Button onClick={handleSubmit} type="primary" className="mt-3 bg-[#1677ff]">
        Tạo phiếu
      </Button>
    </>
  );
};
export default AddReceipt;
