
import {
 
  Button,

  Form,
  Input,
  Select,
  message,
} from 'antd';

import api from '../utils/api';
import { useNavigate } from 'react-router-dom';







const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
   const [form] = Form.useForm();
const navigate=useNavigate()
  const onFinish = async (values: any) => {
   
    try {
      const savedUser = await api.post('/auth/register', values)
      
      if (savedUser) {
        navigate("/login")
      }
      
    } catch (err: any) {
      if (err.response.status === 409) {
        message.error("User Already Registered")
      } else {
        message.error("Error registering user :Try again!")
      }
    }
  };





  return (
    <div className='register'>
      <div className='register-form'>
    <div className='register-heading'>
      <h2> Register</h2>
    </div>
    <div >

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ prefix: '86' }}
      style={{ maxWidth: 500 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
            hasFeedback
            
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
            ]}
            
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="role" label="Roles">
        <Select>
              <Select.Option value="admin" >Admin</Select.Option>
              <Select.Option value="developer" >Developer</Select.Option>
              
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{width:"250px"} }>
          Register
        </Button>
      </Form.Item>
      </Form>
        </div>
        </div>
      </div>
  )
}

export default Register
