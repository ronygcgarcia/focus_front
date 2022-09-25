import axios from "../utils/axios";

const getStudentCheckouts = async (filter = {}) => {
  const { data: checkouts } = await axios.get("/checkouts", { params: filter });

  return checkouts;
};

const setReturned = async (checkoutId, status) => {
  const { data: message } = await axios.put(`/checkouts/${checkoutId}`, {
    status,
  });

  return message;
};

export { getStudentCheckouts, setReturned };
