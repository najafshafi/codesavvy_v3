import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import { Button } from "@nextui-org/react";

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3003/api/reset-password",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully.");
        // Redirect to login page after successful password reset
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div>
      <div className="maincontainer">
        <h1
          className="mt-5 mb-3"
          style={{ fontFamily: "'Aeonik', sans-serif" }}
        >
          Reset Password
        </h1>
        <form className="flex flex-col gap-4">
          <input
            className="max-w-xs border-1 border-gray-200 p-2 px-3 rounded-lg"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="max-w-xs border-1 border-gray-200 p-2 px-3 rounded-lg"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            radius="full"
            color="success"
            className="w-40 text-white"
            onClick={handleResetPassword}
            type="submit"
          >
            Reset code
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
