// pages/index.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /public page
    router.push("/public");
  }, [router]);

  return null; // This page doesn't need to render anything.
};

export default Home;
