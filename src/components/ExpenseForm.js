
// src/components/ExpenseForm.js
import React, { useState, useContext } from 'react';
import api from '../api/api';
import { ExpenseContext } from '../context/ExpenseContext';

export default function ExpenseForm() {
  const { fetchExpenses } = useContext(ExpenseContext);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post('/expenses', { amount: parseFloat(amount), category, date, description });
      // refresh list and summary
      await fetchExpenses();
      setAmount(''); setDate(''); setDescription(''); setCategory('Food');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Failed to add expense');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <input type="number" step="0.01" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Shopping</option>
        <option>Entertainment</option>
        <option>Health</option>
        <option>Other</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit" disabled={busy}>{busy ? 'Adding...' : 'Add'}</button>
    </form>
  );
}
