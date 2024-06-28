import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../SupabaseClient';
import { UserContext } from './UserContext';
import './Report.css';

const Report = () => {
  const { user } = useContext(UserContext);
  const [expenses, setExpenses] = useState([]);
  const [highestTransaction, setHighestTransaction] = useState(0);
  const [averageTransaction, setAverageTransaction] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('title, amount, date')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setExpenses(data);

        // Calculate the total amount
        const total = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        setTotalAmount(total);

        // Calculate the highest transaction
        const highest = Math.max(...data.map(expense => parseFloat(expense.amount)));
        setHighestTransaction(highest);

        // Calculate the average transaction
        const average = data.length > 0 ? total / data.length : 0;
        setAverageTransaction(average);
      }
    };

    if (user) {
      fetchExpenses();
    }
  }, [user]);

  return (
    <div className="expense-report-card">
      <h2>Expense Report</h2>
      <div className="report-details">
        <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
        <p><strong>Highest Transaction:</strong> ${highestTransaction.toFixed(2)}</p>
        <p><strong>Average Transaction:</strong> ${averageTransaction.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Report;
