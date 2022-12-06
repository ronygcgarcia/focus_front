import axios from "../utils/axios";

const getBooks = async (filter) => {
  const { data: books } = await axios.get("/api/v1/books", { params: filter });

  return books;
};

const getBook = async (book_id) => {
  const { data: book } = await axios.get(`/api/v1/books/${book_id}`);

  return book;
};

const checkoutBook = async (bookId) => {
  const { data: book } = await axios.post("/api/v1/checkouts", {
    book_id: bookId,
  });

  return book;
};

const getBookGenre = async () => {
  const { data: genre } = await axios.get("/api/v1/genres");

  return genre;
};

const storeBook = async (book) => {
  const { data: bookResponse } = await axios.post("/api/v1/books", book);

  return bookResponse;
};

export { getBooks, getBook, checkoutBook, getBookGenre, storeBook };
