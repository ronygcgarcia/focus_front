import { Button, Form, Input, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, getBookGenre } from "../../services/bookService";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
const { Option } = Select;

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
    responsive: ['md', 'lg'],
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
    responsive: ['md', 'lg'],
  },
  {
    title: "Available",
    dataIndex: "stock",
    key: "stock",
    responsive: ['md', 'lg'],
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
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  async function bookIndex(filter = {}) {
    setLoading(true);
    const booksResponse = await getBooks(filter);
    const books = booksResponse.map((book) => ({
      key: book.id,
      title: book.title,
      author: book.author,
      publish_year: book.publish_year,
      genre: book.genre,
      stock: book.stock,
    }));
    setBooks(books);
    setLoading(false);
  }

  async function fetchGenres() {
    const genres = await getBookGenre();
    setGenres(genres);
  }

  const onFinish = async (values) => {
    await bookIndex(values);
  };

  useEffect(() => {
    bookIndex();
    fetchGenres();
  }, []);
  return (
    <div className="site-index">
      <div className="site-link-button">
        <div className="site-top-table">
          <Form className="site-filters" onFinish={onFinish} autoComplete="off">
            <Form.Item name="title">
              <Input placeholder="Search by title" />
            </Form.Item>
            <Form.Item name="author">
              <Input placeholder="Search by author" />
            </Form.Item>
            <Form.Item name="genre_id">
              <Select
                showSearch
                placeholder="Select a genre"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                style={{
                  minWidth: "200px",
                }}
                allowClear
              >
                {genres.map((genre) => (
                  <Option value={genre.id} key={genre.id}>
                    {genre.name}
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
          {user?.roles?.includes("librarian") ? (
            <Link to="book/create" className="ant-btn ant-btn-default">
              Create book
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={books}
        pagination={{
          pageSize: 10,
        }}
        loading={loading}
        className="site-table"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default BookIndexComponent;
