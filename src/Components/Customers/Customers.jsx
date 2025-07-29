import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Trash } from "lucide-react"; // delete icon

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/customers");
        setCustomers(response.data);
      } catch (error) {
        enqueueSnackbar("Error fetching customers: " + error.message, {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
      enqueueSnackbar("Customer deleted successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to delete customer: " + error.message, {
        variant: "error",
      });
    }
  };

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <span className="text-blue-500 text-2xl font-bold mb-2">
            Loading...
          </span>
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96">
          <span className="text-red-500 text-xl font-semibold mb-2">
            No customers found.
          </span>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
            <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Customer List
            </h1>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-center uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-center uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-center uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold text-center uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="hover:bg-blue-50 transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700 font-medium">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-800">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="text-red-600 hover:text-red-800 transition duration-200"
                          title="Delete"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
