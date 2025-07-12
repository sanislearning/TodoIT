import React from 'react'
import {useState,useEffect} from 'react'
import {useRef} from 'react'
import axios from 'axios'

function Dashboard() {
  const [tasks,setTasks]=useState([])
  const taskRef=useRef()

  async function updater(){
    try{
    let response=await axios.get("http://localhost:3000/user/dashboard",{
      headers:{
        token:localStorage.getItem('token')
      }
    })
    console.log(response.data.tasks)
    setTasks(response.data.tasks)
  }
  catch(error){
    console.log(error)
  }
  }
  useEffect(()=>{updater()},[])

  async function create(){
    try{
    if(!taskRef.current.value.trim()){
      alert("Todo cannot be empty");
      return;
    }
    let response=await axios.post("http://localhost:3000/todos/create",{
      todo:taskRef.current.value
    },{headers:{
      token:localStorage.getItem('token')
    }})
    console.log(response.data)
    updater()
    taskRef.current.value='';
  }
  catch(error){
    console.log(error)
  }
  }
  
  async function DeleteMe(id) {
    try{
    let response=await axios.delete("http://localhost:3000/todos/delete",{
      headers:{token:localStorage.getItem('token')},
    data:{
      todoId:id
    }})
    console.log(response.data)
    updater()
  }
  catch(error){
    console.log(error)
  }
  }

  return (
    <div>
      <h1>TaskList</h1>
      <input id='todobar' placeholder='Enter your todo' ref={taskRef}></input>
      <button onClick={create}>Create Todo</button>
      <div>
        {tasks.map(task=>
        (<div key={task._id}>{task.todo}<button onClick={()=>DeleteMe(task._id)}>Delete</button>
        </div>))}
      </div>
    </div>
  )
}

export default Dashboard