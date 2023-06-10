import {
  DesktopOutlined,
 
  FileExcelOutlined,
 

 
} from '@ant-design/icons';

import { Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;



function getItem(
  label,
  key,
  icon,
  children,
) {
  return {
    key,
    icon,
    children,
    label,
  } 
}



const items = [
  getItem('Upload file', '1', <Link to="/main"><FileExcelOutlined /></Link>),
  
  getItem('Admin Panel', '2', <Link to="/main/admin"><DesktopOutlined /></Link>),
  
];

const SidebarComponent = () => {

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  
  const handleSignOut = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      
    }
    navigate("/login")
  }
  



  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <div className='sign-out'>
          <Button type="primary" shape="round"  size='large' onClick={()=>handleSignOut()} >
            Sign out
            
            </Button>
            </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
         <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Avdhendra </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarComponent;