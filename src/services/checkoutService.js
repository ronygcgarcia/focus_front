import axios from "../utils/axios";

const getStudentCheckouts = async () => {
  const { data: checkouts } = await axios.get("/checkouts");

  return checkouts;
};

export { getStudentCheckouts };
