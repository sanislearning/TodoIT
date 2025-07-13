import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const taskRef = useRef();
  const navigate = useNavigate();

  async function updater() {
    try {
      const response = await axios.get("http://localhost:3000/user/dashboard", {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updater();
  }, []);

  async function create() {
    try {
      const task = taskRef.current.value.trim();
      if (!task) {
        alert("Todo cannot be empty");
        return;
      }

      await axios.post("http://localhost:3000/todos/create", {
        todo: task
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });

      taskRef.current.value = '';
      updater();
    } catch (error) {
      console.log(error);
    }
  }

  async function DeleteMe(id) {
    try {
      await axios.delete("http://localhost:3000/todos/delete", {
        headers: { token: localStorage.getItem('token') },
        data: { todoId: id }
      });

      updater();
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdateMe(id) {
    try {
      const newTodo = prompt("Enter the updated todo:");
      if (!newTodo || !newTodo.trim()) return;

      await axios.put('http://localhost:3000/todos/update', {
        todoId: id,
        newTodo: newTodo
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      });

      updater();
    } catch (error) {
      console.log(error);
    }
  }

  function signout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10 relative">
      <button
        onClick={signout}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        Sign Out
      </button>

      <div className="w-full max-w-xl bg-white text-black rounded-2xl shadow-lg p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">📝 Task List</h1>

        <div className="flex gap-2 mb-6">
          <input
            ref={taskRef}
            placeholder="Enter your todo"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={create}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition"
          >
            Create
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {tasks.map(task => (
            <div
              key={task._id}
              className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-3"
            >
              <span>{task.todo}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => UpdateMe(task._id)}
                  className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-900 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => DeleteMe(task._id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
