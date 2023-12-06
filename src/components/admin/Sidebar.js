import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical">
        {/* <div className="flex justify-center pb-3 pt-5 text-[18px] font-semibold text-white">
          PHÚC ANH
        </div> */}
        <div className="flex justify-center">
          <img
            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/360105467_667159718787800_8617391947234862772_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=RB6PE9yCuKEAX_boHMI&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCaKPTeH1Yjz6B_j638OaqlXVqMX5zJfTnNqeI_59D0uw&oe=65749EEB"
            alt=""
            className="max-h-[90px] object-contain"
          />
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'Sản phẩm'
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'Người dùng'
          },
          {
            key: '3',
            icon: <VideoCameraOutlined />,
            label: 'Thương hiệu'
          },
          {
            key: '4',
            icon: <UploadOutlined />,
            label: 'Hóa đơn'
          },
          {
            key: '5',
            icon: <UploadOutlined />,
            label: 'Cấu hình'
          },
          {
            key: '6',
            icon: <UploadOutlined />,
            label: 'Nhập kho'
          },
          {
            key: '7',
            icon: <UploadOutlined />,
            label: 'Báo cáo'
          }
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
