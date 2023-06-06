import {
  DesktopOutlined,
 
  FileExcelOutlined,
 

 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {Link, Outlet} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Upload file', '1', <Link to="/"><FileExcelOutlined /></Link>),
  getItem('Admin Panel', '2', <Link to="admin"><DesktopOutlined /></Link>),
  
];

const SidebarComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
         <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Avdhendra </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarComponent;