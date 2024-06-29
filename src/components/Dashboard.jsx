import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../SupabaseClient';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setExpenses(data);
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ title, amount, date, user_id: user.id }]);

    if (error) {
      console.error('Error adding expense:', error);
    } else {
      setExpenses([...expenses, ...data]);
      setTitle('');
      setAmount('');
      setDate('');
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting expense:', error);
    } else {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  const highestTransaction = Math.max(...expenses.map(expense => parseFloat(expense.amount)), 0);
  const averageTransaction = expenses.length ? totalAmount / expenses.length : 0;

  const monthlyData = {};
  expenses.forEach((expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    if (!monthlyData[month]) {
      monthlyData[month] = { total: 0, count: 0 };
    }
    monthlyData[month].total += parseFloat(expense.amount);
    monthlyData[month].count += 1;
  });

  const monthlyAverageData = Object.keys(monthlyData).map((month) => ({
    month,
    average: (monthlyData[month].total / monthlyData[month].count).toFixed(2),
  }));

  return (
    <div className="dashboard">
      <header className="dashboard-header" onDoubleClick={() => { navigate('/signout') }}>
        <h1><span>Welcome</span>, {user.email}</h1>
      </header>
      <div className="dashboard-content">
        <div className="form-and-summary">
          <div className="summary-section">
            <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
            <p><strong>Highest Transaction:</strong> ${highestTransaction.toFixed(2)}</p>
            <p><strong>Average Transaction:</strong> ${averageTransaction.toFixed(2)}</p>
          </div>
          <form className="expense-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              placeholder="Enter Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="basic-button" type="submit">Add Expense</button>
          </form>
        </div>
        <div className="chart-section">
          <h2>Monthly Expense Average</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={monthlyAverageData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="expenses-list">
        <input
          type="text"
          placeholder="Search expenses"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {filteredExpenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <p>{expense.title}: ${expense.amount} on {expense.date}</p>
            <button className="basic-button" onClick={() => handleDelete(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
