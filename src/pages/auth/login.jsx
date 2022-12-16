import { Button, Form, Input, Card, Image } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import "./login.css";
import { getUser, login } from "../../services/authService";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginLogo from './assets/login.svg';

const LoginComponent = () => {
  const navigate = useNavigate();
  const { authState, authDispatch } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      authDispatch({
        type: 'notification',
        payload: {
          notification: {
            type: "loading",
            msg: `Loading dashboard`,
          }
        }
      });
      authDispatch({
        type: 'log',
        payload: {
          loggedIn: true
        }
      });
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/");
      authDispatch({
        type: 'notification',
        payload: {
          notification: {
            type: "success",
            msg: `Welcome`,
          }
        }
      });
      const user = await getUser();
      console.log(authState);
      authDispatch({
        type: 'user',
        payload: {
          user
        }
      })
    } catch (error) {
      console.log(error);
      authDispatch({
        type: 'log',
        payload: {
          loggedIn: false
        }
      });
      let msg = 'Something went wrong';
      if (error.response.status === 401 || error.response.status === 404) msg = 'Invalid credentials'
      authDispatch({
        type: 'notification',
        payload: {
          notification: {
            type: "error",
            msg,
          }
        }
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
      <div className="login-container">
        <div className="login-form">
          <div className="login-form-title">
            <p>Login</p>
          </div>
          <Card bordered={false}>
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                md: {
                  offset: 4,
                  span: 16,
                },
                xl: {
                  offset: 4,
                  span: 16,
                }
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  md: {
                    offset: 4,
                    span: 16,
                  },
                  xl: {
                    offset: 4,
                    span: 16,
                  }
                }}
              >
                <Button type="primary" htmlType="submit"
                  style={{
                    background: '#303a50',
                    borderColor: '#303a50'
                  }}
                  disabled={authState.loggedIn}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="login-info">
          <p className="login-info-title">My U Library</p>
          <div>
            <p>Welcome back</p>
            <p>Login to the dashboard</p>
          </div>
          <div>
            <Image
              className="login-info-image"
              width={"70%"}
              preview={false}
              src={loginLogo}></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
