import { Button, Form, Input, Select, Spin } from "antd";
import { Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getRoles, storeUser } from "../../services/authService";
import "../../pages/form.css";
import AuthContext from "../../context/AuthContext";
const { Title } = Typography;

const UserCreateComponent = () => {
  const { setNotification } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setSaving("loading");
      await storeUser(values);
      setSaving("success");
      setNotification({
        type: "success",
        msg: "User created succesfully",
      });
      navigate("/users");
    } catch (error) {
      setSaving("reject");
      setNotification({
        type: "success",
        msg: error.response.data.message,
      });
    }
  };
  const [roles, setRoles] = useState([]);
  const [saving, setSaving] = useState("checkout");

  const layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 8 },
    },
  };

  const buttonStatus = {
    checkout: "Save user",
    loading: <Spin />,
    success: (
      <>
        <span>User saved successfully</span> <CheckOutlined />
      </>
    ),
    reject: (
      <>
        <span>Something went wrong</span> <CloseCircleOutlined />
      </>
    ),
  };

  useEffect(() => {
    async function fetchRoles() {
      const role = await getRoles();
      setRoles(role);
    }
    fetchRoles();
  }, []);

  return (
    <div
      className="site-detail"
      style={{
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {<Title level={3}>Create user</Title>}
      <Form
        className="site-form"
        name="basic"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First name"
          name="first_name"
          rules={[{ required: true, message: "First name is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true, message: "Last name is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
            {
              pattern: new RegExp(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
              ),
              message:
                "Password must contain at least eight characters, at least one number and one special characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password_confirmation"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role_id"
          rules={[{ required: true, message: "Role is required!" }]}
        >
          <Select>
            {roles.map((role) => (
              <Select.Option value={role.id} key={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="site-checkout-button"
            disabled={saving !== "checkout"}
          >
            {buttonStatus[saving]}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserCreateComponent;
