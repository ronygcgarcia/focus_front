import axios from "../utils/axios";

const login = async (email, password) => {
  const { data: token } = await axios.post("/login", {
    email,
    password,
  });

  return token;
};

const getRoutes = async () => {
  const { data: routes } = await axios.get("/routes");

  return routes;
};

const getUser = async () => {
  const { data: user } = await axios.get("/user");

  return user;
}

export { login, getRoutes, getUser };
