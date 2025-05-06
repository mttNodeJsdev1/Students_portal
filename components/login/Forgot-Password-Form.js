"use client";
import { useState } from "react";
const ForgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSendOtp = async () => {
    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setMessage("Please enter a valid 10-digit mobile number");
      return;
    }
    try {
      const res = await fetch(
        "https://backend.indiasarkarinaukri.com/newUser/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile: "+91" + mobile }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage(data.message || "OTP sent successfully");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(
        "https://backend.indiasarkarinaukri.com/newUser/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile: "+91" + mobile, otp }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setOtpVerified(true);
        setMessage(data.message || "OTP verified successfully");
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Error verifying OTP");
    }
  };
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(
        "http://192.168.1.47:5000/newUser/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: "+91" + mobile,
            newPassword: newPassword,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Password reset successfully");
      } else {
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password");
    }
  };
  return (
    <div
      className="text-black w-full h-screen flex justify-center items-center bg-cover bg-center moving"
      style={{ backgroundImage: "url(/images/sign-image.jpg)" }}
    >
      <div className="bg-white/80 p-6 w-full max-w-md rounded-2xl shadow-xl transition duration-300 hover:shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {!otpSent ? (
          <>
            <div className="flex items-center mb-3">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-gray-600 select-none">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-2 w-full rounded-r-md focus:outline-none "
                maxLength={10}
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="bg-blue-500 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md w-full font-medium"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-blue-500 cursor-pointer  hover:bg-blue-700 transition text-white px-4 py-2 rounded-md w-full font-medium mb-3"
            >
              Verify OTP
            </button>

            {otpVerified && (
              <>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 w-full mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleResetPassword}
                  className="bg-blue-500 cursor-pointer  hover:bg-blue-700 transition text-white px-4 py-2 rounded-md w-full font-medium"
                >
                  Reset Password
                </button>
              </>
            )}
          </>
        )}
        {message && (
          <p className="mt-4 text-sm text-center text-black font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;
