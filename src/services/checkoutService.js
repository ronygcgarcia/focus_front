import axios from "../utils/axios";

const getStudentCheckouts = async () => {
  const { data: checkouts } = await axios.get("/checkouts");

  return checkouts;
};

const setReturned = async (checkoutId, status) => {
  const { data: message } = await axios.put(`/checkouts/${checkoutId}`, {
    status,
  });

  return message;
};

export { getStudentCheckouts, setReturned };
