
import React, { useState } from 'react';
import { auth, db } from '../authentications/Firebase';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      if (userData.role === 'admin') {
        navigate('/Crud');
      } else {
        navigate('/Home');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <p className="mt-4">
          Don't have an account? <Link to="/signup-page" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default LoginPage
