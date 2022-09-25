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
};

const getRoles = async () => {
  const { data: roles } = await axios.get("/roles");
  return roles;
};

const storeUser = async (user) => {
  const { data: userResponse } = await axios.post("/users", user);
  return userResponse;
};

const getUsers = async () => {
  const { data: users } = await axios.get("/users");
  return users;
};

export { login, getRoutes, getUser, getRoles, storeUser, getUsers };
