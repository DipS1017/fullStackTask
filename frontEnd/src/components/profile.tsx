"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for the app directory
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the user profile using the token
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to fetch user data. Please log in again.");
        router.push("/login");
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Username: {user?.username}</p>
    </div>
  );
};

export default ProfilePage;
