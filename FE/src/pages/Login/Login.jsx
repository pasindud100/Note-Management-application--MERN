import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border border-gray-300 rounded-lg  p-10">
          <form action="" onSubmit={() => {}}>
            <h2 className="mb-5 text-2xl">Login Here</h2>

            <input type="text" placeholder="Email" className="input-box" />
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
