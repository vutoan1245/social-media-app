import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "components/NavBar";
import HomePage from "components/HomePage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);

  return (
    <Router>
      <NavBar />
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/home" /> : <SignIn />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
