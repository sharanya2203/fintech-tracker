"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TransactionsPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/transactions",
        {
          amount: Number(amount),
          type,
          category,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Added Successfully");

      setAmount("");
      setType("expense");
      setCategory("");
      setDescription("");

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed to Add Transaction"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Add Transaction
        </h1>

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full mb-4 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full mb-4 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleAddTransaction}
          className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}