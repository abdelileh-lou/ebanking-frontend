import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

export default function NavbarSearch({ query }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/customers/search?Keyword=${encodeURIComponent(
            query
          )}`
        );
        setSearchResults(response.data);
      } catch (error) {
        enqueueSnackbar("Error fetching data: " + error.message, {
          variant: "error",
        });
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, enqueueSnackbar]);

  // Only show results if there's a query
  if (!query || query.trim() === "") return null;

  return (
    <div className="flex justify-center w-full mt-20 absolute z-40">
      <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-full max-w-xs mx-auto max-h-96 overflow-y-auto border border-gray-200">
        {loading ? (
          <div className="text-center py-4 text-blue-500 animate-pulse">
            Searching...
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {searchResults.map((customer) => (
              <li
                key={customer.id}
                className="hover:bg-blue-50 transition duration-200"
              >
                <Link to={`/customers/${customer.id}`} className="block p-4">
                  <div className="font-semibold text-blue-700 text-lg">
                    {customer.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    📧 {customer.email} <br />
                    📞 {customer.phone}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!loading && searchResults.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
}
