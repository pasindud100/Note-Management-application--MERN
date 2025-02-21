import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstancs";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) return setError("Please fill in your name.");
    if (!validEmail(email)) return setError("Please enter a valid email.");
    if (!password) return setError("Please enter a password.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");

    setError("");

    try {
      const response = await axiosInstance.post("/api/users/create-account", {
        fullName: name,
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
    <div>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-300 rounded-lg p-10">
          <form onSubmit={handleSignup}>
            <h2 className="mb-5 text-2xl">Sign Up</h2>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                placeholder="Password"
                className="input-box"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={isShowPassword ? "text" : "password"}
              />
              <div className="absolute right-2 top-3 cursor-pointer">
                {isShowPassword ? (
                  <FaEye size={20} onClick={() => setIsShowPassword(false)} />
                ) : (
                  <FaEyeSlash
                    size={20}
                    onClick={() => setIsShowPassword(true)}
                  />
                )}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm pb-2">{error}</p>}

            <button type="submit" className="btn-primary">
              Create account
            </button>

            <p className="text-sm text-center mt-4">
              Have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Sign In!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
