"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function PieChart({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  return (
    <div className="w-80">
      <Pie data={data} />
    </div>
  );
}