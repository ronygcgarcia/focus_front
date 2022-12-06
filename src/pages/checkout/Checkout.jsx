import { Button, Form, Modal, Select, Space, Table, Typography } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  getStudentCheckouts,
  setReturned,
} from "../../services/checkoutService";
import AuthContext from "../../context/AuthContext";
import { getUsers } from "../../services/authService";
import "../../pages/list.css";
const { Text } = Typography;
const { Option } = Select;

const CheckoutComponent = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkouts, setCheckouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [checkout, setCheckout] = useState();
  const { setNotification } = useContext(AuthContext);

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
        user: `${checkout.user?.first_name} ${checkout.user?.last_name}`,
        checkout_date: checkout.checkout_date,
        status: checkout.status,
      };
    });
    setCheckouts(books);
    setLoading(false);
  }

  const onFinish = async (values) => {
    await checkoutIndex(values);
  };

  const showModal = (checkoutId) => {
    setCheckout(checkoutId);
    setOpen(true);
  };

  const handleOk = async (e) => {
    try {
      setConfirmLoading(true);
      await setReturned(checkout, true);
      await checkoutIndex();
      setConfirmLoading(false);
      setOpen(false);
      setNotification({
        type: "success",
        msg: "Book returned successfully",
      });
    } catch (error) {
      setOpen(false);
      setConfirmLoading(false);
      setNotification({
        type: "error",
        msg: error.response.data.message,
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

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
      responsive: ["md", "lg"],
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
      responsive: ["md", "lg"],
    },
    {
      title: "Status",
      key: "status",
      responsive: ["xs", "sm", "md", "lg"],
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
  if (user?.profiles?.some(((profile) => profile.name === 'librarian'))) {
    columns.push({
      title: "Action",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          {!record.status ? (
            <Button
              type="primary"
              onClick={() => {
                showModal(record.key);
              }}
            >
              Return
            </Button>
          ) : (
            <></>
          )}
          <Modal
            title="Return book"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>Are you sure to return this book?</p>
          </Modal>
        </Space>
      ),
    });
  }

  useEffect(() => {
    checkoutIndex();
    if (user?.roles?.includes("librarian")) fetchUsers();
  }, [user]);
  return (
    <div className="site-index">
      {user?.roles?.includes("librarian") ? (
        <div className="site-top-table">
          <div className="site-filters">
            <Form
              className="site-form-filters"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item name="user_id" className="site-filter-item">
                <Select
                  showSearch
                  placeholder="Select a user"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
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
                <Button
                  type="primary"
                  htmlType="submit"
                  className="site-search-button"
                >
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
        scroll={{ x: true }}
      />
    </div>
  );
};

export default CheckoutComponent;
