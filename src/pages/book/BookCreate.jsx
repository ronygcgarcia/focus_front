import { Button, Form, Input, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { getBookGenre, storeBook } from "../../services/bookService";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const BookCreateComponente = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setSaving("loading");
      await storeBook(values);
      setSaving("success");
      navigate("/");
    } catch {
      setSaving("reject");
    }
  };
  const [genres, setGenre] = useState([]);
  const [saving, setSaving] = useState("checkout");

  const buttonStatus = {
    checkout: "Save book",
    loading: <Spin />,
    success: (
      <>
        <span>Book saved successfully</span> <CheckOutlined />
      </>
    ),
    reject: (
      <>
        <span>Something went wrong</span> <CloseCircleOutlined />
      </>
    ),
  };

  useEffect(() => {
    async function fetchGenre() {
      const genre = await getBookGenre();
      setGenre(genre);
    }
    fetchGenre();
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
      {(<Title level={3}>Create book</Title>)}
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
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input a title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input a description!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Image link"
          name="link_image"
          rules={[{ required: true, message: "Please input a link image!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[{ required: true, message: "Please input an author!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre_id"
          rules={[{ required: true, message: "Please input a genre!" }]}
        >
          <Select>
            {genres.map((genre) => (
              <Select.Option value={genre.id} key={genre.id}>
                {genre.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Publish year"
          name="publish_year"
          rules={[{ required: true, message: "Please input a publish year!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please input a stock!" }]}
        >
          <Input type="number" />
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

export default BookCreateComponente;
