import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/state";
import { SpinnerIcon } from "assets/icons";
import TextField from "./common/TextField";
import { loginUser } from "../api/authApi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loggedInRes = await loginUser(email, password);

      if (loggedInRes) {
        dispatch(
          setLogin({
            user: loggedInRes.user,
            token: loggedInRes.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <TextField
          label="Email Address"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? <SpinnerIcon /> : "Submit"}
          </button>
        </div>

        <p className="text-right">
          Register a new account{" "}
          <Link to="/sign-up" className="text-blue-500 hover:underline">
            Sign up?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
