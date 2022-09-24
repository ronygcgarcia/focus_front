import { Checkbox, Space, Table, Typography } from "antd";
import { useEffect, useState, useContext } from "react";
import {
  getStudentCheckouts,
  setReturned,
} from "../../services/checkoutService";
import AuthContext from "../../context/AuthContext";
const { Text } = Typography;

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
  async function checkoutIndex() {
    const checkoutsResponse = await getStudentCheckouts();
    const books = checkoutsResponse.map((checkout) => {
      const { book } = checkout;
      return {
        key: checkout.id,
        title: book.title,
        author: book.author,
        checkout_date: checkout.checkout_date,
        status: checkout.status,
      };
    });
    setCheckout(books);
  }

  const onChange = async (e) => {
    await setReturned(e.target.value, e.target.checked);
    await checkoutIndex();
  };

  useEffect(() => {
    checkoutIndex();
  }, []);
  return <Table columns={columns} dataSource={checkouts} />;
};

export default CheckoutComponent;
