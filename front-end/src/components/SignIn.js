import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/state";
import { SpinnerIcon } from "../assets/icons";
import TextField from "./common/TextField";
import { loginUser } from "../api/authApi";
import useForm from "../hooks/useForm";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    return errors;
  };

  const { values, errors, loading, setErrors, handleChange, handleSubmit } =
    useForm(initialValues, validate);

  const onSubmit = async () => {
    try {
      const loggedInRes = await loginUser(values.email, values.password);
      if (loggedInRes) {
        dispatch(
          setLogin({ user: loggedInRes.user, token: loggedInRes.token })
        );
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      setErrors({ message: "Wrong email or password" });
      console.error("SignUp error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>
      {errors.message && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
          {errors.message}
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <TextField
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
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
