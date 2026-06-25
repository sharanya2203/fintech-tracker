"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load transactions");
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
  `${process.env.NEXT_PUBLIC_API_URL}/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transaction Deleted");
      fetchTransactions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete transaction");
    }
  };

  const exportCSV = () => {
    const headers =
      "Amount,Type,Category,Description,Date\n";

    const rows = transactions
      .map(
        (t) =>
          `${t.amount},${t.type},${t.category},${t.description},${new Date(
            t.transaction_date
          ).toLocaleDateString()}`
      )
      .join("\n");

    const csv = headers + rows;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "transactions.csv");
  };
  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Transaction Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [
      ["Amount", "Type", "Category", "Description", "Date"],
    ],
    body: transactions.map((t) => [
      t.amount,
      t.type,
      t.category,
      t.description,
      new Date(
        t.transaction_date
      ).toLocaleDateString(),
    ]),
  });

  doc.save("transactions.pdf");
};

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <h1 className="text-4xl font-bold mb-8">
        Transaction History
      </h1>

      <div className="bg-white rounded-lg shadow p-6">

        <div className="flex justify-between items-center mb-4">
  <div className="flex gap-2">
    <button
      onClick={exportCSV}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Export CSV
    </button>

    <button
      onClick={exportPDF}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Export PDF
    </button>
  </div>
          

          <input
            type="text"
            placeholder="Search by category..."
            className="border p-3 rounded w-full md:w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
  <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions
              .filter((t) =>
                t.category
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">₹{t.amount}</td>
                  <td className="p-3">{t.type}</td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3">{t.description}</td>
                  <td className="p-3">
                    {new Date(
                      t.transaction_date
                    ).toLocaleDateString()}
                  </td>

                <td className="p-3">
  <div className="flex gap-2">
    <Link href={`/edit-transaction/${t.id}`}>
      <button className="bg-blue-500 text-white px-3 py-1 rounded">
        Edit
      </button>
    </Link>

    <button
      onClick={() => deleteTransaction(t.id)}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  </div>
</td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>

        {transactions.length === 0 && (
          <p className="text-center mt-4">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}