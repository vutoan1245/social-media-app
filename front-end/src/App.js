import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "components/NavBar";
import HomePage from "components/HomePage";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <div className="auth-wrapper">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
