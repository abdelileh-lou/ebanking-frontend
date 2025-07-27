import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Page Not Found
        </h2>
        <p className="text-center text-gray-600 mb-4">
          The page you are looking for does not exist.
        </p>
        <p className="text-center text-gray-500 mb-6">
          Please check the URL or return to the homepage.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
