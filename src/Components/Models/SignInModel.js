import React, { useState, useMemo, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../Auth/axiosInstance";
import Cookies from "js-cookie"; // For managing cookies

const SignInModel = ({ children, setUser }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validatePassword = (value) => value.length >= 6;

  const isEmailInvalid = useMemo(() => email && !validateEmail(email), [email]);
  const isPasswordInvalid = useMemo(
    () => password && !validatePassword(password),
    [password]
  );

  // Retrieve user from localStorage on mount
  useEffect(() => {
    const lastRoute =
      localStorage.getItem("lastRoute") || window.location.pathname;
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // navigate('/'); // Redirect to home if user is already logged in
      navigate(lastRoute);
    }
  }, [setUser, navigate]);

  // const handleSubmit = async () => {
  //   setErrors({});
  //   try {
  //     const res = await AxiosInstance.post("/login", { email, password });
  //     const { token, user } = res.data; // Destructure token and user data from response

  //     console.log("Login Response:", res.data);

  //     if (token) {
  //       // Save the token and user data to both localStorage and cookies
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("user", JSON.stringify(user));

  //       // Store the token in a cookie (expires in 1 day)
  //       Cookies.set("token", token, { expires: 1, path: "/" });
  //       Cookies.set("user", JSON.stringify(user), { expires: 1, path: "/" });

  //       setUser(user); // Set the user data in state
  //       navigate("/"); // Redirect to home page

  //       onOpenChange(false); // Close the modal
  //     } else {
  //       console.error("Token not found in response!");
  //       setErrors({ general: "Invalid login response, no token provided." });
  //     }
  //   } catch (err) {
  //     if (err.response && err.response.data.errors) {
  //       const errorObj = {};
  //       err.response.data.errors.forEach((error) => {
  //         errorObj[error.param] = error.msg;
  //       });
  //       setErrors(errorObj);
  //     } else if (err.response && err.response.data.msg) {
  //       setErrors({ general: err.response.data.msg });
  //     } else {
  //       setErrors({
  //         general: "An unexpected error occurred. Please try again.",
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    setErrors({});
    try {
      const res = await AxiosInstance.post("/login", { email, password });
      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        Cookies.set("token", token, { expires: 1, path: "/" });
        Cookies.set("user", JSON.stringify(user), { expires: 1, path: "/" });

        setUser(user); // Set user data in state
        navigate("/"); // Redirect to the home page
        onOpenChange(false); // Close modal
      } else {
        setErrors({ general: "Invalid login response, no token provided." });
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        const errorObj = {};
        err.response.data.errors.forEach((error) => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj); // Display field-specific validation errors
      } else if (err.response && err.response.data.msg) {
        setErrors({ general: err.response.data.msg }); // General error message
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        {children}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <EmailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
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
                  color={
                    isPasswordInvalid || errors.password ? "danger" : "default"
                  }
                  errorMessage={
                    isPasswordInvalid
                      ? "Password must be at least 6 characters"
                      : errors.password
                  }
                />
                {errors.general && (
                  <div className="text-red-500 text-sm">{errors.general}</div>
                )}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <a color="primary" href="/forgot-password" size="sm">
                    <span>Forgot password?</span>
                  </a>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignInModel;
