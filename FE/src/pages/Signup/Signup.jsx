import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please fill the name.");
      return;
    }
    if (!validEmail(email)) {
      setError("Please enter valid email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError("");
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-300 rounded-lg  p-10">
          <form action="" onSubmit={handleSignup}>
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
                  className="cursor-pointer "
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="cursor-pointer "
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
            </div>
            {error && <p className="text-red-500 text-sm pb-2">{error}</p>}
            <button type="submit" className="btn-primary">
              Create account
            </button>

            <p className="text-sm text-center mt-4">
              have an account?{" "}
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
