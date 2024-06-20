import React from 'react'
import { useState } from 'react';
import { auth, db } from '../authentications/Firebase';
import { useNavigate, Link } from 'react-router-dom';


const SignupPage = () => {

  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('')
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(Email, Password);
      const user = userCredential.user;


      await db.collection('users').doc(user.uid).set({

        Name,
        Address,
        Email,
        Password,
        Role,

      });
      navigate('/login-page');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select value={Role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
        <p className="mt-4">
          Already have an account? <Link to="/login-page" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default SignupPage
