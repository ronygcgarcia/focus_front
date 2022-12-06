import { Button, Form, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, getBookGenre } from "../../services/bookService";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../pages/list.css";
import columns from "./TableColumns";
const { Option } = Select;


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
      genre: book.genre?.name,
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
      <div className="site-top-table">
        <div className="site-filters">
          <Form
            className="site-form-filters"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item name="title" className="site-filter-item">
              <Input placeholder="Search by title" />
            </Form.Item>
            <Form.Item name="author" className="site-filter-item">
              <Input placeholder="Search by author" />
            </Form.Item>
            <Form.Item name="genre_id" className="site-filter-item">
              <Select
                showSearch
                placeholder="Select a genre"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                allowClear
              >
                {genres.map((genre) => (
                  <Option value={genre.id} key={genre.id}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item >
              <Button
                type="primary"
                htmlType="submit"
                className="site-search-button"
              >
                Search
              </Button>
            </Form.Item>
          </Form>
          {user?.profiles?.some((profile) => profile.name==='librarian') ? (
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
