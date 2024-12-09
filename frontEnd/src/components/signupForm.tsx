"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const debounceTimeoutEmail = useRef<NodeJS.Timeout | null>(null);
  const debounceTimeoutUsername = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear the previous timeout for email
    if (debounceTimeoutEmail.current) {
      clearTimeout(debounceTimeoutEmail.current);
    }

    // Set a new timeout for debouncing
    debounceTimeoutEmail.current = setTimeout(() => {
      checkEmailAvailability(value);
    }, 500); // Adjust debounce delay as needed
  };

  const checkEmailAvailability = async (email: string) => {
    if (!email) {
      setIsEmailTaken(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/checkEmail?email=${email}`,
      );
      setIsEmailTaken(response.data.isTaken);
    } catch (error) {
      console.error("Error checking email availability:", error);
      setIsEmailTaken(false); // Assume not taken if error occurs
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    // Clear the previous timeout for username
    if (debounceTimeoutUsername.current) {
      clearTimeout(debounceTimeoutUsername.current);
    }

    // Set a new timeout for debouncing
    debounceTimeoutUsername.current = setTimeout(() => {
      checkUsernameAvailability(value);
    }, 500); // Adjust debounce delay as needed
  };

  const checkUsernameAvailability = async (userName: string) => {
    if (!userName) {
      setIsUsernameTaken(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/checkUsername?userName=${userName}`,
      );
      setIsUsernameTaken(response.data.isTaken);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setIsUsernameTaken(false); // Assume not taken if error occurs
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!email || !userName || !fullName || !password || !retryPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (password !== retryPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (isEmailTaken) {
      toast.error("Email is already taken.");
      return;
    }
    if (isUsernameTaken) {
      toast.error("Username is already taken.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { email, userName, password, fullName },
        { withCredentials: true },
      );

      if (response.status === 201) {
        toast.success(response.data.message || "Signup successful!");
        // Clear form fields after successful signup
        setEmail("");
        setUserName("");
        setFullName("");
        setPassword("");
        setRetryPassword("");
        router.push("/login");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        "An error occurred during signup. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mt-4">
          Register your account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              className="block w-full p-2 mb-1 border border-gray-300 rounded"
            />
            {email && (
              <p
                className={`text-sm mt-1 ${
                  isEmailTaken ? "text-red-600" : "text-green-600"
                }`}
              >
                {isEmailTaken
                  ? "This email is already taken."
                  : "This email is available."}
              </p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleUsernameChange}
              disabled={isLoading}
              className="block w-full p-2 mb-1 border border-gray-300 rounded"
            />
            {userName && (
              <p
                className={`text-sm mt-1 ${
                  isUsernameTaken ? "text-red-600" : "text-green-600"
                }`}
              >
                {isUsernameTaken
                  ? "This username is already taken."
                  : "This username is available."}
              </p>
            )}
          </div>

          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-900"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="retryPassword"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="retryPassword"
              name="retryPassword"
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
              disabled={isLoading}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Signup;
