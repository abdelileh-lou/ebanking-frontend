import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {
        enqueueSnackbar("Error fetching customers: " + error.message, { variant: "error" });
      }
    };
    fetchCustomers();
  }, [enqueueSnackbar]);

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-0 m-0 pt-25">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">Customers</h1>
      <div className="w-full flex justify-center">
        <table className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg shadow overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-3 px-4 border-b border-gray-300 text-center">ID</th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 text-center">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
              >
                <td className="py-2 px-4 border-b border-gray-200 rounded-l-lg">{customer.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{customer.name}</td>
                <td className="py-2 px-4 border-b border-gray-200 rounded-r-lg">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
