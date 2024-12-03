import React, { useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { Checkbox, Input } from "@nextui-org/react";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const validateEmail = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validatePassword = value => value.length >= 6;

  const isEmailInvalid = useMemo(() => email && !validateEmail(email), [email]);
  const isPasswordInvalid = useMemo(() => password && !validatePassword(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await axios.post('http://localhost:5001/api/auth/signin', { email, password });
      localStorage.setItem('token', res.data.token); // Store token
      localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user information
      setUser(res.data.user); // Set the user data
      navigate(from); // Redirect to the initially requested page or home page
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const errorObj = {};
        err.response.data.errors.forEach(error => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj);
      } else if (err.response && err.response.data.msg) {
        setErrors({ general: err.response.data.msg });
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src="./images/loginlogo.png"
        alt="logo"
        style={{ height: "100px" }}
      ></img>
      <h1 className="mt-5" style={{ fontFamily: "'Aeonik', sans-serif" }}>
        Login
      </h1>
      <p style={{ fontFamily: "'Aeonik', sans-serif" }} className="text-center">
        Don't have an account? Sign up as a <Link to="/signUp">Student</Link>.
      </p>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            endContent={
              <EmailIcon className="text-2xl text-default-400 pointer-events-none" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={isEmailInvalid || !!errors.email}
            color={(isEmailInvalid || errors.email) ? "danger" : "default"}
            errorMessage={isEmailInvalid ? "Please enter a valid email" : errors.email}
            className="mb-3"
          />
          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={isPasswordInvalid || !!errors.password}
            color={(isPasswordInvalid || errors.password) ? "danger" : "default"}
            errorMessage={isPasswordInvalid ? "Password must be at least 6 characters" : errors.password}
          />
          {errors.general && <div className="text-red-500 text-sm">{errors.general}</div>}
          <div className="flex py-2 px-1 justify-between gap-5">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              className="w-80"
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="md">
              {/* Forgot password? */}
            </Link>
          </div>
          <Button className="mt-3 w-48 align-content-center" variant="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
