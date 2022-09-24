import { Button, Form, Input, Select, Spin } from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getRoles, storeUser } from "../../services/authService";
const { Title } = Typography;

const UserCreateComponent = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setSaving("loading");
      await storeUser(values);
      setSaving("success");
      navigate("/users");
    } catch {
      setSaving("reject");
    }
  };
  const [roles, setRoles] = useState([]);
  const [saving, setSaving] = useState("checkout");

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
      className="site-book-detail"
      style={{
        width: "100%",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {<Title level={3}>Create user</Title>}
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          label="First name"
          name="first_name"
          rules={[{ required: true, message: "Please input a name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true, message: "Please input a name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input an email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
              pattern: new RegExp(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
              ),
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
          rules={[{ required: true, message: "Please input a role!" }]}
        >
          <Select>
            {roles.map((role) => (
              <Select.Option value={role.id} key={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
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
