"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correct for app directory
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch user data
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch user data. Please log in again.");
        router.push("/login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Not Logged in, Redirecting to login.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      {/* Text Section */}
      <div className="text-center w-full">
        <h1 className="text-3xl font-semibold">
          This is a Protected Route of the app.
        </h1>
        <p className="mt-2 text-2xl">
          Welcome to the profile section of our page.
        </p>
        <p className="mt-2 text-xl">
          This page is accessible only to logged in User.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
