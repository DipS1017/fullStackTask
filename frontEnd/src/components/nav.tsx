"use client";

import React, { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between p-4 mx-auto">
        <a className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRul6M-BRLBH_nA0Np5TIJZTdLqru19hzrDHQ&s"
            alt="Webpoint task"
            className="h-8"
          />
          <span className="text-2xl font-semibold text-white">
            Internship Task
          </span>
        </a>

        {/* Hamburger Icon for mobile */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a
                href="/public"
                className="block py-2 px-3 text-white rounded hover:text-gray-300"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="block py-2 px-3 text-white rounded hover:text-gray-300"
              >
                Profile
              </a>
            </li>
            <Link href="/signup">
              <button
                type="button"
                className="bg-blue-900 text-white hover:underline outline-none font-medium rounded-lg text-sm px-4 py-2"
              >
                Sign up
              </button>
            </Link>
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-blue-700 p-4`}
        >
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <a
                href="/public"
                className="block py-2 px-3 text-white rounded hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="block py-2 px-3 text-white rounded hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
            </li>
            <Link href="/signup">
              <button
                type="button"
                className="bg-blue-900 text-white hover:underline outline-none font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
