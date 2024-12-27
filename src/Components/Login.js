import React, { useState, useMemo, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Checkbox, Input } from "@nextui-org/react";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { onOpenChange } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validatePassword = (value) => value.length >= 6;

  const isEmailInvalid = useMemo(() => email && !validateEmail(email), [email]);
  const isPasswordInvalid = useMemo(
    () => password && !validatePassword(password),
    [password]
  );

  // Auto-login if the user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [setUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await axios.post(
        "http://localhost:3003/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure content type is set to JSON
          },
          withCredentials: true,
        }
      );

      if (response.data.token) {
        // Save JWT token and user info in localStorage and cookies
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        Cookies.set("token", response.data.token, { expires: 1, path: "/" });
        Cookies.set("user", JSON.stringify(response.data.user), {
          expires: 1,
          path: "/",
        });

        setUser(response.data.user); // Set the user in state
        navigate("/"); // Redirect to home page
        onOpenChange(false); // Close modal if used
      }
    } catch (err) {
      setErrors({ general: "Invalid credentials, please try again." });
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* <img src="./images/loginlogo.png" alt="logo" style={{ height: "100px" }} /> */}
      <h1 style={{ fontFamily: "'Aeonik', sans-serif" }}>Login</h1>
      <p style={{ fontFamily: "'Aeonik', sans-serif" }} className="text-center">
        Don't have an account? Sign up as a <Link to="/signUp">Student</Link>.
      </p>
      <div className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
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
            color={isEmailInvalid || errors.email ? "danger" : "default"}
            errorMessage={
              isEmailInvalid ? "Please enter a valid email" : errors.email
            }
            className="mb-3"
          />
          <div className="relative">
            <Input
              endContent={
                <div className="flex items-center">
                  <div
                    className="cursor-pointer ml-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </div>
              }
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"} // Conditionally toggle the password visibility
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={isPasswordInvalid || !!errors.password}
              color={
                isPasswordInvalid || errors.password ? "danger" : "default"
              }
              errorMessage={
                isPasswordInvalid
                  ? "Password must be at least 6 characters"
                  : errors.password
              }
            />
          </div>
          {errors.general && (
            <div className="text-red-500 text-sm">{errors.general}</div>
          )}
          <div className="flex py-2 px-1 justify-between gap-5">
            <Checkbox classNames={{ label: "text-small" }} className="w-80">
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="md">
              {/* Forgot password? */}
            </Link>
          </div>
          <Button
            className="mt-3 w-48 align-content-center"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
