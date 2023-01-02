import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import React, {useState, useEffect} from "react";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import Todo from "./Todo";

import { db } from "./firebase";
// import {query, collection, onSnapshot} from 'firebase/firestore';

const style={
  bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container:`bg-slate-100 max-w-[600px] w-full m-auto rounded-md shadow-xl`,
  heading:`text-3xl font-bold text-center text-gray-800 p-2`,
  form:`flex justify-between p-2`,
  toList:`p-2`,
  input:`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`,
  button:`border p-4 ml-2 bg-purple-500 text-slate-100`,
  count:`text-center p-2`
}
function App() {
  const [todos, setTodos]=useState([]);
  const [input, setInput]=useState('');
  console.log(input)
  //Create Todo
  const createTodo=async(e)=>{
    e.preventDefault();  
    if(input===''){
      alert('Please Input Your Todo');
      return
    }
    await addDoc(collection(db,'todos'),{
      text:input,
      completed:false
    })
    setInput('');
  };

  //Read Todo
  useEffect(()=>{
    const q=query(collection(db,'todos'))
    const unsubscribe=onSnapshot(q, (QuerySnapshot)=>{
      let todosArr=[];
      QuerySnapshot.forEach((doc)=>{
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr);
    })
    return()=>unsubscribe();
  },[])

  //Update Todo
  const toggleComplete=async(todo)=>{
    await updateDoc(doc(db,'todos',todo.id),{
      completed:!todo.completed
    })
  }

  //Delete Todo
  const deleteTodo=async(id)=>{
    await deleteDoc(doc(db,'todos',id))
  }

  return (
    <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>To Do App</h3>
          <form onSubmit={createTodo} className={style.form}>
              <input 
                value={input} 
                onChange={(e)=>setInput(e.target.value)} 
                className={style.input} 
                type="text" 
                placeholder="Add To Do"/>
              <button className={style.button}><AiOutlinePlusCircle size={30}></AiOutlinePlusCircle></button>
          </form>
          <ul className={style.toList}>
            {todos.map((todo,index)=>(
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
            ))}
          </ul>
          {todos.length<1?null:
          <p className={style.count}>{`You Have ${todos.length} Todo`}</p>
          }
          
        </div>
    </div>
  );
}

export default App;
