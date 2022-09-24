import { Button, Checkbox, Form, Select, Space, Table, Typography } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  getStudentCheckouts,
  setReturned,
} from "../../services/checkoutService";
import AuthContext from "../../context/AuthContext";
import { getUsers } from "../../services/authService";
const { Text } = Typography;
const { Option } = Select;

const CheckoutComponent = () => {
  const { user } = useContext(AuthContext);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Checkout date",
      dataIndex: "checkout_date",
      key: "checkout_date",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space size="middle">
          {record.status ? (
            <Text type="success">Returned</Text>
          ) : (
            <Text type="danger">Not returned</Text>
          )}
        </Space>
      ),
    },
  ];
  if (user?.roles?.includes("librarian")) {
    columns.push({
      title: "Return",
      key: "return",
      render: (_, record) => (
        <Space size="middle">
          <Checkbox
            onChange={onChange}
            defaultChecked={record.status}
            value={record.key}
            disabled={record.status}
          ></Checkbox>
        </Space>
      ),
    });
  }
  const [checkouts, setCheckout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const response = await getUsers();
    setUsers(response);
  }

  async function checkoutIndex(filter = {}) {
    setLoading(true);
    const checkoutsResponse = await getStudentCheckouts(filter);
    const books = checkoutsResponse.map((checkout) => {
      const { book } = checkout;
      return {
        key: checkout.id,
        title: book.title,
        author: book.author,
        user: `${checkout.first_name} ${checkout.last_name}`,
        checkout_date: checkout.checkout_date,
        status: checkout.status,
      };
    });
    setCheckout(books);
    setLoading(false);
  }

  const onChange = async (e) => {
    await setReturned(e.target.value, e.target.checked);
    await checkoutIndex();
  };

  const onFinish = async (values) => {
    await checkoutIndex(values);
  };

  useEffect(() => {
    checkoutIndex();
    if (user?.roles?.includes("librarian")) fetchUsers();
  }, [user]);
  return (
    <div>
      {user?.roles?.includes("librarian") ? (
        <div className="site-link-button">
          <div className="site-top-table">
            <Form
              className="site-filters"
              onFinish={onFinish}
              autoComplete="off"
              style={{
                justifyContent: "space-between",
                width: "25%",
              }}
            >
              <Form.Item name="user_id">
                <Select
                  showSearch
                  placeholder="Select a user"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  style={{
                    minWidth: "200px",
                  }}
                  allowClear
                >
                  {users.map((user) => (
                    <Option value={user.id} key={user.id}>
                      {`${user.first_name} ${user.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Table
        columns={columns}
        dataSource={checkouts}
        pagination={{
          pageSize: 10,
        }}
        loading={loading}
      />
    </div>
  );
};

export default CheckoutComponent;
