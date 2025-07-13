import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  async function connect() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;

    if (!email || !password || !name) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        email,
        password,
        name,
      });
      console.log('Server response: ', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup: ', error);
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          placeholder="Name"
          ref={nameRef}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={connect}
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
