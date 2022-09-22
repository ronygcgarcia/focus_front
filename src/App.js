import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/auth/login";
import AuthContext from "./context/AuthContext";
import BookDetailComponent from "./pages/book/bookDetail";
import BookIndexComponent from "./pages/book/bookIndex";

function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(!!token);
  return (
    <div className="App">
      {loggedIn ? (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Router>
            <Routes>
              <Route element={<HomeComponent />}>
                <Route path="/" exact element={<BookIndexComponent />} />
                <Route
                  path="/:book_id"
                  exact
                  element={<BookDetailComponent />}
                />
              </Route>
            </Routes>
          </Router>
        </AuthContext.Provider>
      ) : (
        <LoginComponent setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
