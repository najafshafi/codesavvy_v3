import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@nextui-org/react";
import axios from "axios";

import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validate email and password
  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?`~]).{6,}$/;
    return passwordRegex.test(value);
  };

  const isEmailInvalid = useMemo(() => email && !validateEmail(email), [email]);
  const isPasswordInvalid = useMemo(
    () => password && !validatePassword(password),
    [password]
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      // Sending the signup request to the backend
      const res = await axios.post(
        "http://localhost:3003/api/signup",
        formData
      );

      // console.log(res.data);

      // Navigate to login or home page after successful signup
      navigate("/login"); // Or navigate('/home') if you want to log the user in right after signup
    } catch (err) {
      // Handle error response
      if (err.response && err.response.data.errors) {
        const errorObj = {};
        err.response.data.errors.forEach((error) => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj);
      } else if (err.response && err.response.data.msg) {
        setErrors({ general: err.response.data.msg }); // Handle general errors
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="MyDiv">
      <div>
        <img
          className="mt-5"
          src="./codesavvy.png"
          alt="logo"
          style={{ height: "130px" }}
        />
        <h1 className="mt-5" style={{ fontFamily: "'Aeonik', sans-serif" }}>
          Sign Up
        </h1>
        <p
          style={{ fontFamily: "'Aeonik', sans-serif" }}
          className="text-center"
        >
          Already have an account? Log in here{" "}
          <Link to="/login">
            <span className="underline hover:text-theme">Login</span>
          </Link>
          .
        </p>
        <div className="maincontainer">
          <Form onSubmit={onSubmit}>
            {/* Name field */}
            <Form.Group controlId="formBasicName" className="mb-3">
              <Input
                type="text"
                label="Name"
                variant="bordered"
                name="name"
                value={name}
                onChange={onChange}
                required
                isInvalid={!!errors.name}
                color={errors.name ? "danger" : "default"}
                errorMessage={errors.name}
                className="max-w-xs"
              />
            </Form.Group>

            {/* Email field */}
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Input
                type="email"
                label="Email"
                variant="bordered"
                name="email"
                value={email}
                onChange={onChange}
                required
                isInvalid={isEmailInvalid || !!errors.email}
                color={isEmailInvalid || errors.email ? "danger" : "default"}
                errorMessage={
                  isEmailInvalid ? "Please enter a valid email" : errors.email
                }
                className="max-w-xs"
              />
            </Form.Group>

            {/* Password field */}
            <Form.Group controlId="formBasicPassword">
              <Input
                label="Password"
                variant="bordered"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="Enter your password"
                isInvalid={isPasswordInvalid || !!errors.password}
                color={
                  isPasswordInvalid || errors.password ? "danger" : "default"
                }
                errorMessage={
                  isPasswordInvalid
                    ? "Password must be at least 6 characters and must contain 1 Capital Letter, 1 number and a special character"
                    : errors.password
                }
                endContent={
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <VisibilityOffIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <VisibilityIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
            </Form.Group>

            {/* General error message */}
            {errors.general && (
              <div className="text-red-500 text-sm">{errors.general}</div>
            )}

            {/* Submit button */}
            <Button
              radius="full"
              color="success"
              className="mt-3 w-40 text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
