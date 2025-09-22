// src/components/ExpenseList.js
import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import api from '../api/api';
import './ExpenseList.css'; // Import the CSS

export default function ExpenseList() {
  const { expenses, fetchExpenses, loading } = useContext(ExpenseContext);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div>Loading expenses...</div>;
  if (!expenses || expenses.length === 0) return <div>No expenses yet.</div>;

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.amount}₹</td>
              <td>{exp.category}</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>{exp.description}</td>
              <td>
                <button onClick={() => handleDelete(exp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
