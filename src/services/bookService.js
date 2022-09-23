import axios from "../utils/axios";

const getBooks = async () => {
  const { data: books } = await axios.get("/books");

  return books;
};

const getBook = async (book_id) => {
  const { data: book } = await axios.get(`/books/${book_id}`);

  return book;
};

const checkoutBook = async (books) => {
  const { data: book } = await axios.post("/books/checkout", {
    books,
  });

  return book;
};

export { getBooks, getBook, checkoutBook };
