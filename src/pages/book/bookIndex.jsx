import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../services/bookService";

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
    title: "Genre",
    dataIndex: "genre",
    key: "genre",
  },
  {
    title: "Publish year",
    dataIndex: "publish_year",
    key: "publish_year",
  },
  {
    title: "Available",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Link to={record.key}>Show details {record.title}</Link>
      </Space>
    ),
  },
];

const BookIndexComponent = () => {
  const [books, setBooks] = useState([]);
  async function bookIndex() {
    const booksResponse = await getBooks();
    const books = booksResponse.map((book) => ({
      key: book.id,
      title: book.title,
      author: book.author,
      publish_year: book.publish_year,
      genre: book.genre,
      stock: book.stock
    }))
    setBooks(books);
  }
  useEffect(() => {
    bookIndex();
  }, []);
  return <Table columns={columns} dataSource={books} />;
};

export default BookIndexComponent;
