import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstancs"; // Corrected the import name

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validEmail(email)) {
      setError("Invalid email..Please enter a correct Email.");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setError(null);

    // Login API
    try {
      const response = await axiosInstance.post("/api/users/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-300 rounded-lg p-10">
          <form onSubmit={handleLogin}>
            <h2 className="mb-5 text-2xl">Login Here</h2>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="">
              <input
                placeholder="Password"
                className="input-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isShowPassword ? "text" : "password"}
              />
              <div className="flex justify-end relative top-[-50px] right-2">
                {isShowPassword ? (
                  <FaEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                )}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm pb-2">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign up now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
