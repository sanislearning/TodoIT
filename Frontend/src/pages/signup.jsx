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
    <div>
      <input
        type="email"
        id="email"
        placeholder="Email"
        ref={emailRef}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        ref={passwordRef}
      />
      <input
        id="name"
        placeholder="Name"
        ref={nameRef}
      />
      <button onClick={connect}>
        Submit
      </button>
    </div>
  );
}

export default Signup;
