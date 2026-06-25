"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PieChart from "@/components/PieChart";
import MonthlyReportChart from "@/components/MonthlyReportChart";

export default function DashboardPage() {
  const router = useRouter();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const [analytics, setAnalytics] = useState({
  totalTransactions: 0,
  totalIncome: 0,
  totalExpense: 0,
  highestCategory: "",
});

  const [budgetStatus, setBudgetStatus] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchSummary();
    fetchAnalytics();
    fetchBudgetStatus();
    fetchRecentTransactions();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Dashboard Token:", token);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      setSummary(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBudgetStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Dashboard Token:", token);

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/budget-status",
        {
          headers: {
           Authorization: `Bearer ${token}`
          },
        }
      );

      setBudgetStatus(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Dashboard Token:", token);

      const res = await axios.get(
        "http://localhost:5000/api/transactions/recent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRecentTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Dashboard Token:", token);

    const res = await axios.get(
      "http://localhost:5000/api/dashboard/analytics",
      {
        headers: {
         Authorization: `Bearer ${token}`
        },
      }
    );

    setAnalytics(res.data);
  } catch (error) {
    console.error(error);
  }
};
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify between md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-lg font-medium mb-1">
            Welcome, {user?.name} 👋
          </h2>

          <h1 className="text-3xl font-bold">
            FinTech Dashboard 🚀
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-base font-semibold">
            Total Income
          </h2>
          <p className="text-2xl font-bold mt-1">
            ₹{summary.income}
          </p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-base font-semibold">
            Total Expense
          </h2>
          <p className="text-2xl font-bold mt-1">
            ₹{summary.expense}
          </p>
        </div>

        <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
          <h2 className="text-base font-semibold">
            Balance
          </h2>
          <p className="text-2xl font-bold mt-1">
            ₹{summary.balance}
          </p>
        </div>
      </div>
      {/* Analytics Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div className="bg-indigo-500 text-white p-4 rounded-lg shadow">
    <h2 className="text-base font-semibold">
      Transactions
    </h2>
    <p className="text-2xl font-bold mt-1">
      {analytics.totalTransactions}
    </p>
  </div>

  <div className="bg-green-600 text-white p-4 rounded-lg shadow">
    <h2 className="text-base font-semibold">
      Analytics Income
    </h2>
    <p className="text-2xl font-bold mt-1">
      ₹{analytics.totalIncome}
    </p>
  </div>

  <div className="bg-red-600 text-white p-4 rounded-lg shadow">
    <h2 className="text-base font-semibold">
      Analytics Expense
    </h2>
    <p className="text-2xl font-bold mt-1">
      ₹{analytics.totalExpense}
    </p>
  </div>

  <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
    <h2 className="text-base font-semibold">
      Top Category
    </h2>
    <p className="text-xl font-bold mt-1">
      {analytics.highestCategory || "None"}
    </p>
  </div>
</div>

      {/* Buttons */}
      <div className="grid grid-cols-2 md:flex gap-3 mb-8">
        <Link href="/transactions">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add Transaction
          </button>
        </Link>

        <Link href="/budget">
          <button className="bg-purple-600 text-white px-4 py-2 rounded">
            Set Budget
          </button>
        </Link>

        <Link href="/budgets">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            View Budgets
          </button>
        </Link>

        <Link href="/history">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            View History
          </button>
        </Link>
      </div>
      <Link href="/profile">
  <button className="bg-cyan-600 text-white px-4 py-2 rounded mb-6">
    Profile
  </button>
</Link>
      {/* Budget Status */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Budget Status
        </h2>

        {budgetStatus.length === 0 ? (
          <p>No budgets found</p>
        ) : (
          <div className="grid gap-4">
            {budgetStatus.map((b) => (
              <div
                key={b.id}
                className="border rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg">
                  {b.category}
                </h3>

                <p>Budget: ₹{b.budget}</p>
                <p>Spent: ₹{b.spent}</p>

                <p
                  className={
                    b.remaining < 0
                      ? "text-red-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  Remaining: ₹{b.remaining}
                </p>

                {b.remaining < 0 && (
                  <p className="text-red-600">
                    🚨 Budget Exceeded by ₹{Math.abs(b.remaining)}
  </p>
)}

{b.remaining > 0 &&
 b.remaining <= b.budget * 0.1 && (
  <p className="text-yellow-600 font-bold mt-2">
    ⚠ Budget Almost Reached
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">
          Recent Transactions
        </h2>

        {recentTransactions.length === 0 ? (
          <p>No recent transactions</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Description</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">₹{t.amount}</td>
                  <td className="p-3">{t.type}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-white p-6 rounded-lg shadow mt-8">
  <h2 className="text-2xl font-bold mb-4">
    Income vs Expense
  </h2>

  <PieChart
    income={summary.income}
    expense={summary.expense}
  />
  <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Monthly Report
        </h2>

        <MonthlyReportChart
          income={summary.income}
          expense={summary.expense}
        />
      </div>

    </div>
</div>
    
  
  );
}
