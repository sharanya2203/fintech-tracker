"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/budgets`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      setBudgets(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load budgets");
    }
  };

  const deleteBudget = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/api/budgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      alert("Budget Deleted");

      fetchBudgets();
    } catch (error) {
      console.error(error);
      alert("Failed to delete budget");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">
        Budget History
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
  <table className="w-full">
    
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Monthly Limit</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {budgets.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3">{b.category}</td>

                <td className="p-3">
                  ₹{b.monthly_limit}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteBudget(b.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>


        {budgets.length === 0 && (
          <p className="text-center mt-4">
            No budgets found
          </p>
        )}
      </div>
    </div>
  );
}