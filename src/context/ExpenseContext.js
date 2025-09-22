

// src/context/ExpenseContext.js
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from './AuthContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]); // updated name to match Dashboard
  const [totalSpending, setTotalSpending] = useState(0); // updated name to match Dashboard
  const [loading, setLoading] = useState(false);

  // Fetch all expenses
  const fetchExpenses = useCallback(async () => {
    if (!user) {
      setExpenses([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/expenses');
      setExpenses(res.data.expenses || []);
    } catch (err) {
      console.error('fetchExpenses error', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch monthly summary for charts
  const fetchMonthlySummary = useCallback(async (month) => {
    if (!user) {
      setMonthlySummary([]);
      return;
    }
    try {
      const res = await api.get(`/expenses/summary/monthly?month=${month}`);
      setMonthlySummary(res.data); // includes breakdown, start, end, month
    } catch (err) {
      console.error('fetchMonthlySummary error', err?.response?.data || err.message);
    }
  }, [user]);

  // Fetch total spending summary
  const fetchTotalSpending = useCallback(async (startDate, endDate) => {
    if (!user) {
      setTotalSpending(0);
      return;
    }
    try {
      let url = '/expenses/summary/total';
      if (startDate || endDate) {
        url += `?startDate=${startDate || ''}&endDate=${endDate || ''}`;
      }
      const res = await api.get(url);
      setTotalSpending(res.data.total || 0);
    } catch (err) {
      console.error('fetchTotalSpending error', err?.response?.data || err.message);
    }
  }, [user]);

  // Refresh data when user logs in/out
  useEffect(() => {
    fetchExpenses();
    const today = new Date();
    const month = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    fetchMonthlySummary(month);
    fetchTotalSpending();
  }, [user, fetchExpenses, fetchMonthlySummary, fetchTotalSpending]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        monthlySummary,
        totalSpending,
        loading,
        fetchExpenses,
        fetchMonthlySummary,
        fetchTotalSpending,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
