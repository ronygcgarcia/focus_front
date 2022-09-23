import { Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getStudentCheckouts } from "../../services/checkoutService";
const { Text } = Typography;

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
const CheckoutComponent = () => {
  const [checkouts, setCheckout] = useState([]);
  async function checkoutIndex() {
    const checkoutsResponse = await getStudentCheckouts();
    const books = checkoutsResponse.map((bookItem) => {
      const {
        books: [book],
        checkout_date: checkoutDate,
      } = bookItem;
      return {
        title: book.title,
        author: book.author,
        checkout_date: checkoutDate,
        status: book.checkout_details.status,
      };
    });
    setCheckout(books);
  }
  useEffect(() => {
    checkoutIndex();
  }, []);
  return <Table columns={columns} dataSource={checkouts} />;
};

export default CheckoutComponent;
