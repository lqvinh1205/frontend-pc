import React from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';

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
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/admin">Thống kê</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to="/admin/brand">Thương hiệu</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/admin/users">Người dùng</Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Báo cáo">
          <Menu.Item key="6">Hóa đơn</Menu.Item>
          <Menu.Item key="7">Nhập kho</Menu.Item>
          <Menu.Item key="8">Xuất kho</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          <Link to="/admin/products">Sản phẩm</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
