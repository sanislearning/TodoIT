import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  async function connect() {
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
      });
      console.log('Server response: ', response.data);
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup: ', error);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8 max-w-md mx-auto">
      <input
        id="email"
        placeholder="Email"
        ref={emailRef}
        className="p-2 border rounded w-full"
      />
      <input
        id="password"
        placeholder="Password"
        ref={passwordRef}
        type="password"
        className="p-2 border rounded w-full"
      />
      <input
        id="name"
        placeholder="Name"
        ref={nameRef}
        className="p-2 border rounded w-full"
      />
      <button
        onClick={connect}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded w-full"
      >
        Submit
      </button>
    </div>
  );
}

export default Signup;
