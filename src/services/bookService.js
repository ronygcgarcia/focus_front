import axios from "../utils/axios";

const getBooks = async (filter) => {
  const { data: books } = await axios.get("/books", { params: filter });

  return books;
};

const getBook = async (book_id) => {
  const { data: book } = await axios.get(`/books/${book_id}`);

  return book;
};

const checkoutBook = async (bookId) => {
  const { data: book } = await axios.post("/books/checkout", {
    book_id: bookId,
  });

  return book;
};

const getBookGenre = async () => {
  const { data: genre } = await axios.get("/genre");

  return genre;
};

const storeBook = async (book) => {
  const { data: bookResponse } = await axios.post("/books", book);

  return bookResponse;
};

export { getBooks, getBook, checkoutBook, getBookGenre, storeBook };
