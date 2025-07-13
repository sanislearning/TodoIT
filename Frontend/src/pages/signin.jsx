import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  async function SigninHandler() {
    try {
      const email = emailRef.current.value;
      const pass = passRef.current.value;

      const response = await axios.post("http://localhost:3000/user/signin", {
        email: email,
        password: pass
      });

      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Signin failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passRef}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={SigninHandler}
          className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Submit
        </button>

        <p className="text-center mt-6 text-sm text-gray-500">
          New here?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-black underline cursor-pointer hover:text-gray-700"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signin;
