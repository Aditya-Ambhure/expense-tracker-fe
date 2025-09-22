
// src/components/ExpenseChart.js
import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
  const { summary } = useContext(ExpenseContext);

  const data = {
    labels: summary.map(s => s.category),
    datasets: [
      {
        label: 'Expenses',
        data: summary.map(s => s.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'],
      },
    ],
  };

  if (!summary || summary.length === 0) return <div>No data to show.</div>;

  return <div style={{ maxWidth: 500 }}><Pie data={data} /></div>;
}
