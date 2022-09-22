import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeComponent from "./pages/home/home";
import LoginComponent from "./pages/auth/login";
import AuthContext from "./context/AuthContext";

function App() {
  const token = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(!!token);
  return (
    <div className="App">
      {loggedIn ? (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
          <Router>
            <Routes>
              <Route path="/" exact element={<HomeComponent />}></Route>
            </Routes>
          </Router>
        </AuthContext.Provider>
      ) : (
        <LoginComponent setLoggedIn={setLoggedIn}/>
      )}
    </div>
  );
}

export default App;
