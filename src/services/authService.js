import axios from "../utils/axios";

const login = async (email, password) => {
  const { data: token } = await axios.post("/api/v1/login", {
    email,
    password,
  });

  return token;
};

const getRoutes = async () => {
  const { data: routes } = await axios.get("/api/v1/routes");

  return routes;
};

const getUser = async () => {
  const { data: user } = await axios.get("/api/v1/users/details");

  return user;
};

const getRoles = async () => {
  const { data: roles } = await axios.get("/api/v1/roles");
  return roles;
};

const storeUser = async (user) => {
  const { data: userResponse } = await axios.post("/api/v1/users", user);
  return userResponse;
};

const getUsers = async () => {
  const { data: users } = await axios.get("/api/v1/users");
  return users;
};

export { login, getRoutes, getUser, getRoles, storeUser, getUsers };
