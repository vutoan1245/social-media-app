import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerIcon } from "assets/icons";
import TextField from "./common/TextField";
import FileField from "./common/FileField";
import { registerUser } from "api/authApi";
import useForm from "../hooks/useForm";

const SignUp = () => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  };

  const validate = (values) => {
    let errors = {};
    if (!values.firstName) errors.firstName = "First name is required";
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const { values, errors, loading, setErrors, handleChange, handleSubmit } =
    useForm(initialValues, validate);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.profileImage) {
      formData.append("picture", values.profileImage);
    }

    try {
      const data = await registerUser(formData);
      if (data) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrors({ message: "Register fail" });
      console.error("SignUp error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Sign Up</h3>

      {Object.keys(errors).length > 0 && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, handleRegister)}>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First name"
          value={values.firstName}
          onChange={handleChange}
        />

        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last name"
          value={values.lastName}
          onChange={handleChange}
        />

        <TextField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
        />

        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={values.confirmPassword}
          onChange={handleChange}
        />

        <FileField
          label="Profile Image"
          onChange={(e) =>
            handleChange({
              target: { name: "profileImage", value: e.target.files[0] },
            })
          }
        />

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? <SpinnerIcon /> : "Sign Up"}
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

export default SignUp;
