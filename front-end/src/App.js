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
import ProfilePage from "pages/ProfilePage";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuth ? <Navigate to="/home" /> : <SignInPage />}
          />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/sign-in" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
