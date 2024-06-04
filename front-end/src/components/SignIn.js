import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state/state";

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
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

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
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
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
