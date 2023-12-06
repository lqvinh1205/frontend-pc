import { Avatar, Badge, Button, Dropdown, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const items = [
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Về trang chủ
      </a>
    ),
    key: '0'
  },
  {
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: 'Đăng xuất',
    key: '3'
  }
];

const HeaderAdmin = ({ colorBgContainer, collapsed, setCollapsed }) => {
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: colorBgContainer
      }}>
      <div className="flex justify-between">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64
          }}
        />
        <div className="flex items-center gap-7 pr-4">
          <Badge count={100}>
            <Avatar shape="square" size="small" />
          </Badge>
          <Dropdown menu={{ items }}>
            <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default HeaderAdmin;
