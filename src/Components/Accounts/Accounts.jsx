import React, { useState, useEffect } from "react";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Search,
  Filter,
  Loader,
  AlertCircle,
} from "lucide-react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [operations, setOperations] = useState([]);
  const [accountHistory, setAccountHistory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountIdSearch, setAccountIdSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [operationsLoading, setOperationsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const pageSize = 4;

  // API base URL - adjust this to match your backend
  const BASE_URL = "http://localhost:8080"; // Change this to your actual API URL

  // Fetch all accounts
  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/accounts`);
      if (!response.ok) throw new Error("Failed to fetch accounts");
      const data = await response.json();
      setAccounts(data);
    } catch (err) {
      setError("Failed to load accounts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountById = async (accountId) => {
    try {
      setSearchLoading(true);
      setSearchError(null);
      const response = await fetch(`${BASE_URL}/accounts/${accountId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Account not found");
        }
        throw new Error("Failed to fetch account");
      }
      const data = await response.json();
      setSelectedAccount(data);
      setCurrentPage(0);
      await fetchAccountHistoryPage(accountId, 0);
    } catch (err) {
      setSearchError(err.message);
      setSelectedAccount(null);
      setAccountHistory(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const fetchAccountOperations = async (accountId) => {
    try {
      setOperationsLoading(true);
      const response = await fetch(
        `${BASE_URL}/accounts/${accountId}/operations`
      );
      if (!response.ok) throw new Error("Failed to fetch operations");
      const data = await response.json();
      setOperations(data);
    } catch (err) {
      setError("Failed to load operations: " + err.message);
    } finally {
      setOperationsLoading(false);
    }
  };

  const fetchAccountHistoryPage = async (accountId, page = 0) => {
    try {
      setOperationsLoading(true);
      const response = await fetch(
        `${BASE_URL}/accounts/${accountId}/pageOperations?page=${page}&size=${pageSize}`
      );
      if (!response.ok) throw new Error("Failed to fetch account history");
      const data = await response.json();
      setAccountHistory(data);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to load account history: " + err.message);
    } finally {
      setOperationsLoading(false);
    }
  };

  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setCurrentPage(0);
    setSearchError(null);
    setAccountIdSearch(account.accountId);
    fetchAccountHistoryPage(account.accountId, 0);
  };

  const handleAccountSearch = async (e) => {
    e.preventDefault();
    if (!accountIdSearch.trim()) {
      setSearchError("Please enter an account ID");
      return;
    }
    await fetchAccountById(accountIdSearch.trim());
  };

  const handlePageChange = (newPage) => {
    if (selectedAccount) {
      fetchAccountHistoryPage(selectedAccount.accountId, newPage);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-blue-600">Loading accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAccounts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-15">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">My Accounts</h1>
          <p className="text-blue-600">
            Manage your banking accounts and transactions
          </p>
        </div>

        {/* Account ID Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Search Account by ID
          </h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account ID
              </label>
              <input
                type="text"
                value={accountIdSearch}
                onChange={(e) => setAccountIdSearch(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAccountSearch(e)}
                placeholder="Enter account ID (e.g., ACC123456)"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={searchLoading}
              />
            </div>
            <button
              onClick={handleAccountSearch}
              disabled={searchLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {searchLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </button>
          </div>

          {searchError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{searchError}</p>
            </div>
          )}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Accounts List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Your Accounts
            </h2>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div
                  key={account.accountId}
                  onClick={() => handleAccountSelect(account)}
                  className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transition-all duration-200 border-2 ${
                    selectedAccount?.accountId === account.accountId
                      ? "border-blue-500 shadow-lg transform scale-105"
                      : "border-transparent hover:shadow-lg hover:scale-102"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {account.type || "Account"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {account.accountId}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-900">
                      {formatCurrency(account.balance)}
                    </p>
                    <p className="text-sm text-gray-500">Available Balance</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-blue-900">
                    Recent Transactions
                    {selectedAccount && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        - {selectedAccount.type || "Account"}{" "}
                        {selectedAccount.accountId}
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Last 30 days
                  </div>
                </div>
              </div>

              <div className="p-6">
                {operationsLoading ? (
                  <div className="text-center py-12">
                    <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-blue-600">Loading transactions...</p>
                  </div>
                ) : !selectedAccount ? (
                  <div className="text-center py-12">
                    <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-blue-400" />
                    </div>
                    <p className="text-gray-500">
                      Select an account or search by Account ID to view
                      transactions
                    </p>
                  </div>
                ) : accountHistory &&
                  accountHistory.accountOperationDTOS.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-blue-400" />
                    </div>
                    <p className="text-gray-500">No transactions found</p>
                  </div>
                ) : accountHistory ? (
                  <div className="space-y-4">
                    {/* Account Details Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {selectedAccount.type || "Account"}
                          </h3>
                          <p className="text-blue-100">
                            ID: {selectedAccount.accountId}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {formatCurrency(selectedAccount.balance)}
                          </p>
                          <p className="text-blue-100">Current Balance</p>
                        </div>
                      </div>
                    </div>

                    {/* Operations List */}
                    {accountHistory.accountOperationDTOS.map((operation) => (
                      <div
                        key={operation.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg ${
                              operation.type === "CREDIT"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {operation.type === "CREDIT" ? (
                              <TrendingUp className="h-5 w-5" />
                            ) : (
                              <TrendingDown className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {operation.description}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(operation.operationDate)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-semibold ${
                              operation.type === "CREDIT"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {operation.type === "CREDIT" ? "+" : ""}
                            {formatCurrency(operation.amount)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {operation.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* Pagination */}
                {accountHistory && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Showing page {accountHistory.currentPage + 1} of{" "}
                      {accountHistory.totalPage} (
                      {accountHistory.accountOperationDTOS.length} transactions)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handlePageChange(accountHistory.currentPage - 1)
                        }
                        disabled={accountHistory.currentPage === 0}
                        className="px-4 py-2 text-sm border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() =>
                          handlePageChange(accountHistory.currentPage + 1)
                        }
                        disabled={
                          accountHistory.currentPage >=
                          accountHistory.totalPage - 1
                        }
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
