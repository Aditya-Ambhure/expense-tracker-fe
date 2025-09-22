



















import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Navbar from '../components/Navbar';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const {
    expenses,
    monthlySummary,
    totalSpending,
    fetchExpenses,
    fetchMonthlySummary,
    fetchTotalSpending,
  } = useContext(ExpenseContext);

  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    fetchExpenses();
    const today = new Date();
    const month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(month);
    fetchMonthlySummary(month);
    fetchTotalSpending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    fetchMonthlySummary(month);
  };

  // Chart data
  const barData = {
    labels: monthlySummary?.breakdown?.map((item) => item.category) || [],
    datasets: [
      {
        label: 'Expenses by Category',
        data: monthlySummary?.breakdown?.map((item) => item.total) || [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels:
      expenses?.map((exp) =>
        new Date(exp.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
      ) || [],
    datasets: [
      {
        label: 'Daily Spending',
        data: expenses?.map((exp) => exp.amount) || [],
        fill: false,
        borderColor: '#ff6384',
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: monthlySummary?.breakdown?.map((item) => item.category) || [],
    datasets: [
      {
        label: 'Category Distribution',
        data: monthlySummary?.breakdown?.map((item) => item.total) || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="welcome-text">
          Welcome, <strong>{user?.name}</strong>
        </p>

        {/* Month Selector */}
        <div className="card selector-card">
          <label className="selector-label">Select Month:</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="month-input"
          />
        </div>

        {/* Total Spending Summary */}
        <div className="card total-card">
          <h3>Total Spending</h3>
          <p className="total-amount">₹{totalSpending || 0}</p>
        </div>

        {/* Add Expense Form */}
        <section className="card section-card">
          <h3>Add Expense</h3>
          <ExpenseForm />
        </section>

        {/* Expense List */}
        <section className="card section-card">
          <h3>Your Expenses</h3>
          <ExpenseList />
        </section>

        {/* Charts */}
        {/* <section className="card section-card">
          <h3>Monthly Category Breakdown</h3>
          <Bar data={barData} />

          <h3 className="chart-title">Daily Spending Trend</h3>
          <Line data={lineData} />

          <h3 className="chart-title">Category Distribution</h3>
          <Pie data={pieData} />
        </section> */}


        {/* Charts */}
<section style={{ marginTop: 20 }}>
  <div className="chart-container">
    <h3 className="chart-title">Monthly Category Breakdown (Bar Chart)</h3>
    <Bar data={barData} />
  </div>

  <div className="chart-container">
    <h3 className="chart-title">Daily Spending Trend (Line Chart)</h3>
    <Line data={lineData} />
  </div>

  <div className="chart-container">
    <h3 className="chart-title">Category Distribution (Pie Chart)</h3>
    <Pie data={pieData} />
  </div>
</section>

      </div>
    </>
  );
}
