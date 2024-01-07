import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';

import { Outlet } from 'react-router-dom';
import SideBar from '../components/admin/Sidebar/SideBar';
import HeaderAdmin from '../components/admin/HeaderAdmin';

const { Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <SideBar />
      </Sider>
      <Layout className="site-layout">
        <HeaderAdmin />
        <Content style={{ margin: '0 16px' }} className="flex flex-col">
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div className="site-layout-background flex-1" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Phuc Anh Design ©2018 Created by UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
