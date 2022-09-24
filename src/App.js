import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/Home";
import LoginComponent from "./pages/auth/Login";
import AuthContext from "./context/AuthContext";
import BookDetailComponent from "./pages/book/BookDetail";
import BookIndexComponent from "./pages/book/BookIndex";
import CheckoutComponent from "./pages/checkout/Checkout";
import history from "./utils/history";
import Router from "./components/Router";

function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!token);

  return (
    <div className="App">
      <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Router history={history}>
          <Routes>
            <Route element={<HomeComponent />}>
              <Route path="/" exact element={<BookIndexComponent />} />
              <Route
                path="/book/:book_id"
                exact
                element={<BookDetailComponent />}
              />
              <Route
                path="/checkouts"
                exact
                element={<CheckoutComponent />}
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
