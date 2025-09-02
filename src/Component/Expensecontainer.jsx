import React, { useEffect , useState} from 'react';
import Form from './Form';
import History from './History';
import Balancecontainer from './Balancecontainer';
import {v4 as uid} from 'uuid';


function Expensecontainer() {


//npm i uuid
  const EXPENSE=[
  
]

   const [expense,setExpense]=useState(EXPENSE);
      async function addExpense(title,amount)
      {
        // setExpense([...expense,{id:uid(),title,amount}])
        // console.log(expense);
        const newExpense=await fetch("http://localhost:3333/post",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,amount})
      });
      getExpenses();
      }
      useEffect(()=>{
        getExpenses();
      },[]);

      async function getExpenses() {
        const response=await fetch("http://localhost:3333/")
        const data =await response.json();
        setExpense(data.expense);  
      }
  
      async function deleteExpense(id){
        await fetch(`http://localhost:3333/delete/${id}`,{
        method:"DELETE"
      });
      getExpenses();

  return (
    <div className='expense-container'>
        <Balancecontainer expense={expense}/>
        <Form addExpense={addExpense}/>
        <History expense={expense} deleteExpense={deleteExpense}/>
    </div>
  );
      }
}
export default Expensecontainer;