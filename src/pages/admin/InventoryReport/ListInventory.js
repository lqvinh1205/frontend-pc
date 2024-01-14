import { Button, Row, Table, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInventory } from './slice';
import { exportToExcel } from '../../../ultils';

const ListInventory = (props) => {
  const products = useSelector((data) => data.inventory.list);
  const total = useSelector((data) => data.inventory.total);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Mã nhập kho',
      className: 'column-money',
      dataIndex: 'receipt_id',
      render: (receipt) => <span>{receipt.code}</span>
    },
    {
      title: 'Mã code',
      className: 'column-money',
      dataIndex: 'product_id',
      render: (product) => <span>{product.code}</span>
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_id',
      render: (product) => <span>{product.name}</span>
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'product_id',
      render: (product) => <span>{product.brand_id.name}</span>
    },
    {
      title: 'Giá bán',
      dataIndex: 'product_id',
      align: 'center',
      render: (product) => <span>{product.price} VND</span>
    },
    {
      title: 'Giá vốn',
      dataIndex: 'price',
      align: 'center',
      render: (text) => <span>{text} VND</span>
    },
    {
      title: 'Tồn kho',
      align: 'center',
      dataIndex: 'quantity_in_stock',
      render: (text) => <span>{text}</span>
    }
  ];

  const exportToExcelInventory = () => {
    const data = [
      columns.map((item) => item.title),
      ...products.map((item) => {
        return [
          item.receipt_id.code,
          item.product_id.code,
          item.product_id.name,
          item.product_id.brand_id.name,
          item.product_id.price,
          item.price,
          item.quantity_in_stock
        ];
      })
    ];
    exportToExcel(data);
  };

  useEffect(() => {
    dispatch(getInventory());
  }, []);
  return (
    <>
      <Row className="mb-3 justify-end">
        <Button type="primary" className="bg-[#1677ff]" onClick={exportToExcelInventory}>
          Xuất báo cáo
        </Button>
      </Row>

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={products.length > 0 ? products : []}
        bordered
        title={() => <Typography.Title level={3}>Báo cáo tồn kho</Typography.Title>}
        pagination={{
          total: total
        }}
      />
    </>
  );
};

export default ListInventory;
