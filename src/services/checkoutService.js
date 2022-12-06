import axios from "../utils/axios";

const getStudentCheckouts = async (filter = {}) => {
  const { data: checkouts } = await axios.get("/api/v1/checkouts", { params: filter });

  return checkouts;
};

const setReturned = async (checkoutId, status) => {
  const { data: message } = await axios.put(`/api/v1/checkouts/${checkoutId}`, {
    status,
  });

  return message;
};

export { getStudentCheckouts, setReturned };
