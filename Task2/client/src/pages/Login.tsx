
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Login:React.FC = () => {
  const onFinish = async (values: any) => {
     const{email,password}=values
   const loggedInResponse:any=await api.post('login', { email, password })
    if (loggedInResponse) {
     localStorage("token",loggedInResponse?.token)
   }
  
  };
  return (
    <div className='login'>
      
      <div>
        <h2>Login</h2>
      </div>
      <div>

       <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        
      </Form.Item>

      <Form.Item style={{display:"flex", flexDirection:"column"}}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
            </Button>
            <span> Or </span>
         <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
      </div>
    </div>
  )
}

export default Login



