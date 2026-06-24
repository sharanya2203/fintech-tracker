"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transaction = res.data.find(
        (t: any) => t.id == params.id
      );

      if (transaction) {
        setAmount(transaction.amount);
        setType(transaction.type);
        setCategory(transaction.category);
        setDescription(transaction.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTransaction = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/transactions/${params.id}`,
        {
          amount,
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

      alert("Transaction Updated");
      router.push("/history");
    } catch (error) {
      console.error(error);
      alert("Failed to update transaction");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h1 className="text-3xl font-bold mb-6">
          Edit Transaction
        </h1>

        <input
          type="number"
          placeholder="Amount"
          className="border p-3 w-full mb-4 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-3 w-full mb-4 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="border p-3 w-full mb-4 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-3 w-full mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={updateTransaction}
          className="bg-blue-600 text-white w-full p-3 rounded"
        >
          Update Transaction
        </button>
      </div>
    </div>
  );
}