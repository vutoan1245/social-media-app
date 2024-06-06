import React from "react";
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
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to="/sign-in" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuth ? "/home" : "/sign-in"} />}
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path="/profile/:userId"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
