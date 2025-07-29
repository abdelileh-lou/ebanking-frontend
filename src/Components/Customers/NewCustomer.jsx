import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function NewCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const { enqueueSnackbar } = useSnackbar(); // ← Hook for snackbar

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = {
      name: customerName,
      email: customerEmail,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/customers",
        customer
      );
      console.log("Customer created:", response.data);
      enqueueSnackbar("Customer created successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error creating customer:", error);
      enqueueSnackbar("Failed to create customer.", { variant: "error" });
    }

    // Reset form fields
    setCustomerName("");
    setCustomerEmail("");
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">New Customer</h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter customer email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Customer
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
