"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyReportChart({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const data = {
    labels: ["Current Month"],
    datasets: [
      {
        label: "Income",
        data: [income],
        backgroundColor: "rgba(34,197,94,0.7)",
      },
      {
        label: "Expense",
        data: [expense],
        backgroundColor: "rgba(239,68,68,0.7)",
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
      }}
    />
  );
}