import { Button, Card, Spin, Tag } from "antd";
import "./book.css";
import { getBook, checkoutBook } from "../../services/bookService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";

const BookDetailComponent = () => {
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState("checkout");
  const { book_id: bookId } = useParams();

  const buttonStatus = {
    checkout: "Checkout",
    loading: <Spin />,
    success: (
      <>
        <span>Book checkout successfully</span> <CheckOutlined />
      </>
    ),
    reject: (
      <>
        <span>Something went wrong</span> <CloseCircleOutlined />
      </>
    ),
  };

  async function fetchCheckout() {
    try {
      setChecking("loading");
      await checkoutBook(Number(bookId));
      setChecking("success");
    } catch {
      setChecking("reject");
    }
  }

  useEffect(() => {
    async function fetchBook() {
      const book = await getBook(bookId);
      setBook(book);
      setLoading(false);
    }

    fetchBook();
  }, [bookId]);
  return (
    <div className="site-index-detail">
      <Card
        loading={loading}
        cover={
          <img
            alt="example"
            src={book?.link_image}
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          />
        }
        className="site-index-card"
      >
        <Meta
          title={book?.title}
          description={book?.description}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        />
        <p className="site-index-card-info">Author: {book?.author}</p>
        <p className="site-index-card-info">
          Publish year: {book?.publish_year}
        </p>
        <p className="site-index-card-info">Genre: {book?.genre}</p>
        {book?.stock > 0 ? (
          book?.checkout ? (
            <Tag style={{ margin: "1em" }} color="red">
              You already checkout this book
            </Tag>
          ) : (
            <Button
              className="site-checkout-button"
              onClick={fetchCheckout}
              disabled={checking !== "checkout"}
            >
              {buttonStatus[checking]}
            </Button>
          )
        ) : (
          <p
            style={{
              color: "red",
            }}
            className="site-index-card-info"
          >
            Not available
          </p>
        )}
      </Card>
    </div>
  );
};

export default BookDetailComponent;
