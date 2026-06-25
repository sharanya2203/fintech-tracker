"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function BudgetPage() {
  const router = useRouter();

  const [category, setCategory] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");

  const handleAddBudget = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/budgets`,
        {
          category,
          monthly_limit: Number(monthlyLimit),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      alert("Budget Added Successfully");

      setCategory("");
      setMonthlyLimit("");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Budget");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Set Budget
        </h1>

        <input
          type="text"
          placeholder="Category"
          className="border p-3 w-full mb-4 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monthly Limit"
          className="border p-3 w-full mb-4 rounded"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
        />

        <button
          onClick={handleAddBudget}
          className="bg-purple-600 text-white w-full p-3 rounded hover:bg-purple-700"
        >
          Save Budget
        </button>
      </div>
    </div>
  );
}