import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Layout, Badge, Avatar, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  const items = [
    {
      label: <button onClick={() => navigate('/')}>Về trang chủ</button>,
      key: '0'
    },
    {
      type: 'divider'
    },
    {
      label: <button onClick={() => logout()}>Đăng xuất</button>,
      key: '3'
    }
  ];

  return (
    <Layout.Header
      className="bg-white"
      style={{ padding: '0 16px', fontWeight: 'bold', fontSize: 25 }}>
      <div className="flex justify-between">
        <div>Quản lý</div>
        <div className="flex items-center gap-7 pr-4">
          <Badge count={100}>
            <Avatar shape="square" size="small" />
          </Badge>

          <Dropdown menu={{ items }}>
            <Space>
              <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderAdmin;
