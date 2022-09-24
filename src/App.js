import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/auth/Login";
import AuthContext from "./context/AuthContext";
import BookDetailComponent from "./pages/book/BookDetail";
import BookIndexComponent from "./pages/book/bookIndex";
import CheckoutComponent from "./pages/checkout/Checkout";
import BookCreateComponente from "./pages/book/BookCreate";
import history from "./utils/history";
import Router from "./components/Router";
import { getUser } from "./services/authService";
import UserIndexComponent from "./pages/user/UserIndex";
import UserCreateComponent from "./pages/user/UserCreate";

function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!token);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }

    fetchUser();
  }, [loggedIn]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn, setLoggedIn, user }}>
        <Router history={history}>
          <Routes>
            <Route element={<HomeComponent />}>
              <Route path="/" exact element={<BookIndexComponent />} />
              <Route
                path="/book/:book_id"
                exact
                element={<BookDetailComponent />}
              />
              <Route path="/checkouts" exact element={<CheckoutComponent />} />
              <Route
                path="/book/create"
                exact
                element={<BookCreateComponente />}
              />
              <Route
                path="/users"
                exact
                element={<UserIndexComponent />}
              />
              <Route
                path="/users/create"
                exact
                element={<UserCreateComponent />}
              />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
