import React from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
  DropboxOutlined,
  SettingOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <>
      <Link to="/">
        <div className="flex flex-col items-center gap-[10px] py-[15px] text-center text-[20px] text-white">
          <img
            src="https://res.cloudinary.com/dzroyn2i4/image/upload/v1648226288/car/favicon_a63nys.png"
            alt=""
            className="gcol-12"
          />
          <div>ElecCar</div>
        </div>
      </Link>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/admin">Thống kê</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/admin/brand">Thương hiệu</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/admin/users">Người dùng</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<DropboxOutlined />}>
          <Link to="/admin/products">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<ShoppingOutlined />}>
          <Link to="/admin/bills">Đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<FileOutlined />}>
          <Link to="/admin/receipt">Nhập kho</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<FileOutlined />}>
          <Link to="/admin/inventory">Báo cáo tồn kho</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<SettingOutlined />}>
          <Link to="/admin/configuage">Cài đặt cấu hình</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
