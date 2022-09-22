import axios from "../utils/axios";

const getBooks = async () => {
  const { data: books } = await axios.get("/books");

  return books;
};

export { getBooks };
