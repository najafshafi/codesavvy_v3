import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import VerifyCode from "./verifyCode";
import "./SignUp.css";
import { Button } from "@nextui-org/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault(); // Prevent default form behavior (page refresh)
    try {
      // Send code request
      const response = await axios.post("http://localhost:3003/api/send-code", {
        email,
      });
      toast.success("Verification code sent to your email.");
      setIsCodeSent(true); // Show the next step (VerifyCode)
    } catch (error) {
      // Display error if the request fails
      console.error("Error sending code:", error);
      toast.error(error.response?.data?.message || "Error sending code.");
    }
  };

  return (
    <div className="MyDiv">
      <div>
        <img
          className="mt-5"
          src="./codesavvy.png"
          alt="logo"
          style={{ height: "130px" }}
        />
        <div className="maincontainer">
          {!isCodeSent ? (
            <>
              <h1
                className="mt-5 mb-3"
                style={{ fontFamily: "'Aeonik', sans-serif" }}
              >
                Forgot password
              </h1>
              <form className="flex flex-col gap-4" onSubmit={handleSendCode}>
                <input
                  className="max-w-xs border-1 border-gray-200 p-2 px-3 rounded-lg"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  radius="full"
                  color="success"
                  className="w-40 text-white"
                  type="submit"
                >
                  Send Code
                </Button>
              </form>
            </>
          ) : (

              <VerifyCode email={email} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
