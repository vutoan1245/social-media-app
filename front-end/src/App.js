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
import HomePage from "pages/HomePage";
import SignInPage from "pages/SigninPage";
import SignUpPage from "pages/SignupPage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Navigate to="/home" /> : <SignInPage />}
            />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
