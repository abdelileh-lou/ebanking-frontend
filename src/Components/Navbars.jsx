import React from "react";
import { Link } from "react-router-dom";

export default function Navbars() {
  return (
    <nav className="w-full bg-blue-600 text-white shadow m-0 p-0 fixed top-0 left-0 right-0 z-50">
      <div className="w-full m-0 p-0 px-4">
        <div className="flex items-center justify-between h-16 w-full m-0 p-0">
          {/* Left: Menu Icon and Brand */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded hover:bg-blue-700 focus:outline-none">
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="font-bold text-lg">E-Banking</span>
          </div>
          {/* Center: Search */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Search icon */}
                <svg
                  className="h-5 w-5 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 rounded bg-blue-500 text-white placeholder-gray-200 focus:outline-none focus:bg-blue-400"
                placeholder="Search…"
                type="search"
                aria-label="Search"
              />
            </div>
          </div>
          {/*Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link to="/customers" className="hover:text-blue-200">
              Customers
            </Link>
            <Link to="/accounts" className="hover:text-blue-200">
              Accounts
            </Link>
          </div>
          {/* Right: Placeholder for future icons or profile */}
          <div className="flex items-center space-x-4">
            {/* Add profile, notifications, etc. here */}
          </div>
        </div>
      </div>
    </nav>
  );
}
