import React, { useState, useEffect } from "react";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowRightLeft,
  Loader,
  AlertCircle,
  CheckCircle,
  DollarSign,
  X,
} from "lucide-react";

const Transactions = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState("credit");

  // Form states
  const [creditForm, setCreditForm] = useState({
    accountId: "",
    amount: "",
    description: "",
  });
  const [debitForm, setDebitForm] = useState({
    accountId: "",
    amount: "",
    description: "",
  });
  const [transferForm, setTransferForm] = useState({
    accountSource: "",
    accountDestination: "",
    amount: "",
    description: "",
  });

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/accounts`);
      if (!response.ok) throw new Error("Failed to fetch accounts");
      const data = await response.json();
      console.log("Accounts data:", data); // Debug log
      setAccounts(data);
    } catch (err) {
      setError("Failed to load accounts: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCredit = async (e) => {
    e.preventDefault();
    if (
      !creditForm.accountId ||
      !creditForm.amount ||
      !creditForm.description
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setTransactionLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/accounts/credit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: creditForm.accountId,
          amount: parseFloat(creditForm.amount),
          description: creditForm.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Credit transaction failed");
      }

      setSuccess(
        `Successfully credited $${creditForm.amount} to account ${creditForm.accountId}`
      );
      setCreditForm({ accountId: "", amount: "", description: "" });
      fetchAccounts();
    } catch (err) {
      setError("Credit failed: " + err.message);
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleDebit = async (e) => {
    e.preventDefault();
    if (!debitForm.accountId || !debitForm.amount || !debitForm.description) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setTransactionLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/accounts/debit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: debitForm.accountId,
          amount: parseFloat(debitForm.amount),
          description: debitForm.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Debit transaction failed");
      }

      setSuccess(
        `Successfully debited $${debitForm.amount} from account ${debitForm.accountId}`
      );
      setDebitForm({ accountId: "", amount: "", description: "" });
      fetchAccounts();
    } catch (err) {
      setError("Debit failed: " + err.message);
    } finally {
      setTransactionLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (
      !transferForm.accountSource ||
      !transferForm.accountDestination ||
      !transferForm.amount ||
      !transferForm.description
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (transferForm.accountSource === transferForm.accountDestination) {
      setError("Source and destination accounts cannot be the same");
      return;
    }

    try {
      setTransactionLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/accounts/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountSource: transferForm.accountSource,
          accountDestination: transferForm.accountDestination,
          amount: parseFloat(transferForm.amount),
          description: transferForm.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Transfer failed");
      }

      setSuccess(
        `Successfully transferred $${transferForm.amount} from ${transferForm.accountSource} to ${transferForm.accountDestination}`
      );
      setTransferForm({
        accountSource: "",
        accountDestination: "",
        amount: "",
        description: "",
      });
      fetchAccounts();
    } catch (err) {
      setError("Transfer failed: " + err.message);
    } finally {
      setTransactionLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Banking Transactions
          </h1>
          <p className="text-blue-600">Manage credits, debits, and transfers</p>
        </div>

        {/* Success/Error Messages */}
        {(success || error) && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
              success
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <p className={success ? "text-green-700" : "text-red-700"}>
                {success || error}
              </p>
            </div>
            <button
              onClick={clearMessages}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Transaction Forms */}
        <div className="bg-white rounded-xl shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                {
                  id: "credit",
                  label: "Credit",
                  icon: ArrowUpCircle,
                  color: "green",
                },
                {
                  id: "debit",
                  label: "Debit",
                  icon: ArrowDownCircle,
                  color: "red",
                },
                {
                  id: "transfer",
                  label: "Transfer",
                  icon: ArrowRightLeft,
                  color: "blue",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Credit Form */}
            {activeTab === "credit" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account ID *
                    </label>
                    <select
                      value={creditForm.accountId}
                      onChange={(e) =>
                        setCreditForm({
                          ...creditForm,
                          accountId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => {
                        const accountId = account.accountId || account.id;
                        return (
                          <option key={accountId} value={accountId}>
                            {accountId}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={creditForm.amount}
                        onChange={(e) =>
                          setCreditForm({
                            ...creditForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={creditForm.description}
                    onChange={(e) =>
                      setCreditForm({
                        ...creditForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter transaction description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleCredit}
                  disabled={transactionLoading}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {transactionLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowUpCircle className="h-5 w-5" />
                  )}
                  Credit Account
                </button>
              </div>
            )}

            {/* Debit Form */}
            {activeTab === "debit" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account ID *
                    </label>
                    <select
                      value={debitForm.accountId}
                      onChange={(e) =>
                        setDebitForm({
                          ...debitForm,
                          accountId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => {
                        const accountId = account.accountId || account.id;
                        return (
                          <option key={accountId} value={accountId}>
                            {accountId}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={debitForm.amount}
                        onChange={(e) =>
                          setDebitForm({
                            ...debitForm,
                            amount: e.target.value,
                          })
                        }
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={debitForm.description}
                    onChange={(e) =>
                      setDebitForm({
                        ...debitForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter transaction description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleDebit}
                  disabled={transactionLoading}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {transactionLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5" />
                  )}
                  Debit Account
                </button>
              </div>
            )}

            {/* Transfer Form */}
            {activeTab === "transfer" && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Account *
                    </label>
                    <select
                      value={transferForm.accountSource}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          accountSource: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Source Account</option>
                      {accounts.map((account) => {
                        const accountId = account.accountId || account.id;
                        return (
                          <option key={accountId} value={accountId}>
                            {accountId}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Account *
                    </label>
                    <select
                      value={transferForm.accountDestination}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          accountDestination: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Destination Account</option>
                      {accounts.map((account) => {
                        const accountId = account.accountId || account.id;
                        return (
                          <option key={accountId} value={accountId}>
                            {accountId}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={transferForm.amount}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          amount: e.target.value,
                        })
                      }
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={transferForm.description}
                    onChange={(e) =>
                      setTransferForm({
                        ...transferForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter transfer description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleTransfer}
                  disabled={transactionLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {transactionLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRightLeft className="h-5 w-5" />
                  )}
                  Transfer Funds
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
