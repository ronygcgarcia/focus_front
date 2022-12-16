import React, { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/auth/login";
import AuthContext from "./context/AuthContext";
import BookDetailComponent from "./pages/book/bookDetail";
import BookIndexComponent from "./pages/book/bookIndex";
import CheckoutComponent from "./pages/checkout/Checkout";
import BookCreateComponente from "./pages/book/BookCreate";
import history from "./utils/history";
import Router from "./components/Router";
import UserIndexComponent from "./pages/user/UserIndex";
import UserCreateComponent from "./pages/user/UserCreate";
import NotFoundPage from "./pages/NotFound";
import { message } from "antd";
import Forbidden from "./pages/Forbidden";
import authReducer from "./reducers/authReducer";
import { getUser } from "./services/authService";

const initialState = {
  notification: {},
  user: {},
  loggedIn: false
}

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      authDispatch({
        type: 'user',
        payload: {
          user
        }
      });
    }

    try {
      const token = localStorage.getItem('token')
      if (token && !authState.user?.first_name) fetchUser();
    }
    catch {
      authDispatch({
        type: 'log',
        payload: {
          loggedIn: false
        }
      });
    }
  }, [authState]);

  useEffect(() => {
    if (authState.notification?.type) {
      const messageNotification = {
        success: (msg) => message.success(msg),
        error: (msg) => message.error(msg),
        loading: (msg) => message.info(msg),
      };
      messageNotification[authState.notification.type](authState.notification.msg);
    }
  }, [authState.notification])

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ authState, authDispatch }}
      >
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
              <Route path="/users" exact element={<UserIndexComponent />} />
              <Route
                path="/users/create"
                exact
                element={<UserCreateComponent />}
              />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/forbidden" element={<Forbidden />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
