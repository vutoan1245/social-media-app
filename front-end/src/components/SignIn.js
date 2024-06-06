import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/state";
import { SpinnerIcon } from "assets/icons";

const EmailField = ({ email, setEmail }) => (
  <div className="mb-4">
    <label className="block text-gray-700">Email address</label>
    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      className="mt-1 block w-full rounded-md border-black-600 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);

const PasswordField = ({ password, setPassword }) => (
  <div className="mb-4">
    <label className="block text-gray-700">Password</label>
    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);

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
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to login");
      }

      const loggedInRes = await res.json();

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
        <EmailField email={email} setEmail={setEmail} />
        <PasswordField password={password} setPassword={setPassword} />

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
