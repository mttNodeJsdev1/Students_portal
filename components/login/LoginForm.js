"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const API_URL = "https://backend.indiasarkarinaukri.com/newUser/login";
const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!mobile || !password) {
      setError("Please enter both mobile number and password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ngrok-Skip-Browser-Warning": "true",
        },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();
      console.log("API Response:", data.data);

      // console.log(data);

      if (response.ok) {
        const { token } = data;
        console.log("Hello", token);
        localStorage.setItem("userMobile", mobile);
        localStorage.setItem("token", token);
        localStorage.setItem("data", JSON.stringify(data?.data));
        setSuccessMessage("Login successful!");
        console.log("Helo", setSuccessMessage);
        router.push("/sarkariJobs");
      } else {
        setError(data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div
      className=" text-black w-full h-screen flex justify-center items-center bg-cover bg-center moving"
      style={{ backgroundImage: "url(/images/sign-image.jpg)" }}
    >
      <div className="w-full p-0 lg:max-w-lg lg:p-8 sm:max-w-xl sm:p-4 space-y-6 floating-box">
        <div className="bg-gradient-to-r from-[#a0def7] to-[#def2fa] p-4 lg:p-8 sm:p-8 rounded-xl border-4 border-sky-900 shadow-2xl relative z-50">
          <h3 className="text-darkbule font-bold text-3xl mb-8 text-center">
            Sign In
          </h3>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-sm mb-4 text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-3">
                <span className="text-white text-xl">📱</span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  className="w-full mr-9 ml-1 px-4 py-3 border-2 rounded-lg border-white-300 focus:outline-none"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-3">
                <span className="text-white text-xl">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 text-black rounded-lg focus:outline-none border border-white-300"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="text-white cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  👁️
                </button>
              </label>
            </div>
            <div className="flex justify-between items-center text-blue-900 font-semibold text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span className="text-xs lg:text-sm sm:text-sm">
                  Remember Me
                </span>
              </label>
              <Link href="/forgotPassword">Forgot Password?</Link>{" "}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-sm text-center text-black font-semibold mt-4">
            Do not have an account?
          </p>
          <br />
          <div className="flex justify-between">
            <button
              onClick={() => router.push("/studentSignup")}
              className="text-blue-900 hover:underline -mt-2 font-semibold cursor-pointer"
            >
              Students Sign Up
            </button>
            <button
              onClick={() => router.push("/login/teacherSignup")}
              className="text-blue-900 font-semibold hover:underline -mt-2 cursor-pointer"
            >
              Teacher Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
