import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../services/bookService";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

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
        <Link to={`book/${record.key}`}>Show details</Link>
      </Space>
    ),
  },
];

const BookIndexComponent = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  async function bookIndex() {
    const booksResponse = await getBooks();
    const books = booksResponse.map((book) => ({
      key: book.id,
      title: book.title,
      author: book.author,
      publish_year: book.publish_year,
      genre: book.genre,
      stock: book.stock,
    }));
    setBooks(books);
  }
  useEffect(() => {
    bookIndex();
  }, []);
  return (
    <div>
      <div className="site-link-button">
        {user?.roles?.includes("librarian") ? (
          <Link to="book/create" className="ant-btn ant-btn-default">
            Create book
          </Link>
        ) : (
          <></>
        )}
      </div>
      <Table columns={columns} dataSource={books} />
    </div>
  );
};

export default BookIndexComponent;
