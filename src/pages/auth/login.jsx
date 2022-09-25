import { Button, Form, Input, Card } from "antd";
import React, { useContext } from "react";
import "./login.css";
import { login } from "../../services/authService";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const { setLoggedIn, setNotification } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/");
      setLoggedIn(true);
      setNotification({
        type: "success",
        msg: `Welcome`,
      });
    } catch (error) {
      setNotification({
        type: "error",
        msg: error.response.data.error,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      className="site-card-border-less-wrapper"
      style={{
        maxHeight: "100vh",
      }}
    >
      <Card title="Login" bordered={true}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              md: { offset: 16, span: 16 },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginComponent;
