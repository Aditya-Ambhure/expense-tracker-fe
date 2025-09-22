
// src/components/ExpenseList.js
import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import api from '../api/api';

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
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <th style={{ textAlign: 'left', padding: 8 }}>Amount</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Category</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Date</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Description</th>
          <th style={{ textAlign: 'left', padding: 8 }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: 8 }}>{exp.amount}₹</td>
            <td style={{ padding: 8 }}>{exp.category}</td>
            <td style={{ padding: 8 }}>{new Date(exp.date).toLocaleDateString()}</td>
            <td style={{ padding: 8 }}>{exp.description}</td>
            <td style={{ padding: 8 }}>
              <button onClick={() => handleDelete(exp._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
