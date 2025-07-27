import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-0 m-0 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">Customers</h1>
      <div className="w-full flex justify-center">
        <table className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border-b">{customer.id}</td>
                <td className="py-2 px-4 border-b">{customer.name}</td>
                <td className="py-2 px-4 border-b">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
