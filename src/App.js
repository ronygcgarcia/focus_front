import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/auth/login";
import AuthContext from "./context/AuthContext";
import BookDetailComponent from "./pages/book/bookDetail";
import BookIndexComponent from "./pages/book/bookIndex";
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
              <Route path="/:book_id" exact element={<BookDetailComponent />} />
            </Route>
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
