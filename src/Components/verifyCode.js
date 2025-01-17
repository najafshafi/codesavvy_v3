import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ResetPassword from "./resetPassword";
import { Button } from "@nextui-org/react";

const VerifyCode = ({ email }) => {
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/api/verify-code",
        { email, code }
      );
      console.log("Response:", response); // Log the full response object

      if (response.status === 200) {
        toast.success("Code verified successfully.");
        setIsVerified(true);
      }
    } catch (error) {
      console.error(
        "Verification error:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message || "Invalid verification code."
      );
    }
  };

  return (
    <div>
      <div className="maincontainer">
        {!isVerified ? (
          <>
            <h1
              className="mt-5 mb-3"
              style={{ fontFamily: "'Aeonik', sans-serif" }}
            >
              Code Verification
            </h1>
            <form className="flex flex-col gap-4">
              <input
                className="max-w-xs border-1 border-gray-200 p-2 px-3 rounded-lg"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)} // Ensure this updates `code` properly
                required
              />

              <Button
                radius="full"
                color="success"
                className="w-40 text-white"
                onClick={handleVerifyCode}
                type="submit"
              >
                Verify Code
              </Button>
            </form>
          </>
        ) : (
          <ResetPassword email={email} />
        )}
      </div>
    </div>
  );
};

export default VerifyCode;
