import React, { useState } from 'react'
import react from 'react';


function Expenseitem(props) {
    const {title,amount,_id}=props.expense;
    const type=amount < 0 ? "expense" : "income";

function handledelete(){
     props.deleteExpense(_id)
}
  return (
    <div className={`expense-item ${type}`}>
        <div className='expense-title'>{title}</div> 
        <div className='expense-amount'>${amount}</div>
        <div className='delete-button-overlay'>
            <button onClick={handledelete}>delete</button>
        </div>
         
    </div>
  )
}
export default Expenseitem;