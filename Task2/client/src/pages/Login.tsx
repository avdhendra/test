import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login: React.FC = () => {
  const navigate = useNavigate();
 
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      
      const loggedInResponse: any = await api.post("/auth/login", values);
      console.log("lio", loggedInResponse);
      if (loggedInResponse) {
        localStorage.setItem("token", loggedInResponse.data.token);
        localStorage.setItem("role", loggedInResponse.data.user.role);
        navigate("/main");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        message.error("Invalid Credentials")
      } else if (err.response.status === 404) {
        message.error("User not exist")
        
      } else {
        message.error("Error Logging In.Try Again!")
      }
     
    }
  };
  return (
    <div className="login">
      <div className="login-form-2">
        <div>
          <h2>Login</h2>
        </div>
        <div className="form-2">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: 900 }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
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

            <Form.Item
     
            >
              <div className="button-align">
              <Button
                type="primary"
                htmlType="submit"
             style={{width:"100px"}}
              >
                Log in
              </Button>
              <span>Or</span> 
                <Link to="/register">register now!</Link>
                </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
