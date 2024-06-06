import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * A form field component for handling text inputs.
 */
const TextField = ({ label, type, placeholder, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
    />
  </div>
);

/**
 * A form field component for handling file inputs.
 */
const FileField = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type="file"
      onChange={onChange}
      className="mt-1 block w-full text-gray-700"
    />
  </div>
);

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form submission for user registration.
   */
  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    if (profileImage) {
      formData.append("picture", profileImage);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const data = await response.json();
      if (data) {
        navigate("/sign-in");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("SignUp error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Sign Up</h3>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <TextField
          label="First Name"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label="Last Name"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

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

        <FileField
          label="Profile Image"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />

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
              "Sign Up"
            )}
          </button>
        </div>

        <p className="text-right">
          Already registered{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
