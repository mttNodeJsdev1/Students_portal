"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function StudentSignup() {
  const [showMobileOTP, setShowMobileOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [timer, setTimer] = useState(0); // 2 minutes = 120 seconds
  const [intervalId, setIntervalId] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const otpRefs = useRef([]);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;
    const newOTP = [...formData.otp];
    newOTP[index] = value;
    setFormData({ ...formData, otp: newOTP.join("") });

    // Next input field pe focus shift kare
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleSendOTP = async () => {
    if (!formData.mobile) {
      alert("Please enter a mobile number first.");
      return;
    }
    try {
      const response = await fetch(
        "https://backend.indiasarkarinaukri.com/newUser/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ngrok-Skip-Browser-Warning": "true",
          },
          body: JSON.stringify({ mobile: formData.mobile }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShowMobileOTP(true);
        setShowTimer(true);
        setTimer(120); // 2 minutes = 120 seconds
        alert(data.message || "OTP sent successfully!");
        if (intervalId) clearInterval(intervalId);
        //  Start a new timer
        const newInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(newInterval);
              setShowTimer(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setIntervalId(newInterval);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      alert("Error sending OTP");
    }
  };
  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      alert("Please enter the OTP first.");
      return;
    }
    try {
      const response = await fetch(
        "https://backend.indiasarkarinaukri.com/newUser/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ngrok-Skip-Browser-Warning": "true",
          },
          body: JSON.stringify({ mobile: formData.mobile, otp: formData.otp }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setOtpVerified(true);
        alert(data.message || "OTP verified successfully!");
      } else {
        alert(data.error || "OTP verification failed");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your OTP before signing up.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(
        "https://backend.indiasarkarinaukri.com/newUser/student/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ngrok-Skip-Browser-Warning": "true",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Signup successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("sarkariJobs");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("Error signing up");
    }
  };
  return (
    <div
      className="relative text-black flex items-center justify-center w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('/images/student-signup.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full bg-black opacity-5 h-max"></div>
      <div className="relative z-10 w-full max-w-3xl p-6 space-y-6 floating-box">
        <div className="bg-gradient-to-r from-[#cddef8] to-[#b7d1ec] opacity-90 p-6 rounded-xl border-8 border-sky-100 shadow-2xl">
          <h3 className="mb-6 text-3xl font-bold text-center text-darkblue">
            Student Sign Up
          </h3>
          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Name & Education */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                />
              </label>
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">🎓</span>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                >
                  <option value="">Select your education</option>
                  <option value="highschool">High School</option>
                  <option value="bachelor">Bachelor Degree</option>
                  <option value="master">Master Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">📧</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full max-w-xs px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                />
              </label>
            </div>
            {/* Mobile Number & OTP */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">📞</span>
                {/* Mobile Number Input */}
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your Mobile number"
                  className="w-full max-w-xs px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                />
                {/* Send OTP Button */}
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md cursor-pointer w-fit"
                  onClick={handleSendOTP}
                >
                  Send OTP
                </button>
              </label>
            </div>
            {showMobileOTP && (
              <div className="flex flex-col gap-2">
                <label className="flex items-center space-x-3">
                  <span className="text-xl text-white">⌨</span>
                  <div className="flex space-x-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)} // Reference each input
                        type="text"
                        maxLength="1"
                        className="w-10 h-10 text-lg font-bold text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.otp.split("")[index] || ""} // Fix: Handle string properly
                        onChange={(e) => handleOTPChange(e, index)}
                      />
                    ))}
                  </div>
                  {!otpVerified ? (
                    <button
                      type="button"
                      className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md cursor-pointer w-fit"
                      onClick={handleVerifyOTP}
                    >
                      Verify OTP
                    </button>
                  ) : (
                    <span className="font-bold text-blue-600"> Verified</span>
                  )}
                </label>
              </div>
            )}

            <div>
              {showTimer ? (
                <p>
                  OTP valid for: {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")} minutes
                </p>
              ) : showMobileOTP ? (
                <p style={{ color: "red" }}>OTP Expired! Request a new OTP.</p>
              ) : null}
            </div>
            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">🔒</span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full max-w-xs gap-2 px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="text-white cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  👁️
                </button>
              </label>
              <label className="flex items-center space-x-3">
                <span className="text-xl text-white">🔒</span>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full max-w-xs gap-2 px-4 py-3 border-2 rounded-lg focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="text-white cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  👁️
                </button>
              </label>
            </div>
            {/* Terms and Conditions */}
            <div className="flex items-center text-sm font-semibold text-darkbule">
              <label className="flex items-center space-x-2">
                <input type="checkbox" required className="form-checkbox" />
                <span>
                  I agree to the{" "}
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-blue-500 rounded-lg cursor-pointer bg-darkblue"
              disabled={!otpVerified}
            >
              Sign Up
            </button>
            <p className="text-sm font-semibold text-center text-black">
              Already have an account?{" "}
              <Link href="/login" className="text-darkbule hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
