import React, { useState, useEffect } from 'react';
import Form from './Form';
import History from './History';
import Balancecontainer from './Balancecontainer';

function Expensecontainer() {
  const [expense, setExpense] = useState([]);

  // Add new expense
  async function addExpense(title, amount) {
    try {
      const response = await fetch("http://localhost:3333/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: Number(amount) }) // ensure amount is a number
      });

      const data = await response.json();
      console.log("Added:", data);

      if (data.expense) {
        getExpenses(); // refresh expense list after adding
      }
    } catch (error) {
      console.log("Error adding expense:", error);
    }
  }

  // Fetch all expenses from backend
  async function getExpenses() {
    try {
      const response = await fetch("http://localhost:3333/");
      const data = await response.json();
      setExpense(data.expense);
    } catch (error) {
      console.log("Error fetching expenses:", error);
    }
  }

  // Delete an expense
  async function deleteExpense(id) {
    try {
      await fetch(`http://localhost:3333/delete/${id}`, {
        method: "DELETE"
      });
      getExpenses(); // refresh after deletion
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  }

  // Load expenses on component mount
  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className='expense-container'>
      <Balancecontainer expense={expense} />
      <Form addExpense={addExpense} />
      <History expense={expense} deleteExpense={deleteExpense} />
    </div>
  );
}

export default Expensecontainer;
