import React, { useState } from 'react';
import { auth, db } from '../authentications/Firebase';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(Email, Password);
      const user = userCredential.user;
      const userDoc = await db.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      if (userData.Role === 'admin') {
        navigate('/admin-page');
      } else {
        navigate('/customers-page');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-300">
      <div className="relative w-[1065px] h-[722px] bg-white rounded-[20px] flex">
        <div className="flex flex-col justify-center items-start p-12 gap-6">
          <div className="relative">
            <h2 className="text-rose-500 text-5xl font-extrabold font-['Montserrat']">Login</h2>
            <p className="text-black text-2xl font-light font-['Montserrat'] mt-2">Enter your account details</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[440px] h-[72px] bg-zinc-100 rounded border-2 border-rose-500 pl-6 text-2xl font-medium font-['Montserrat'] placeholder-rose-500"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[440px] h-[72px] bg-zinc-100 rounded border-2 border-rose-500 pl-6 pr-16 text-2xl font-medium font-['Montserrat'] placeholder-rose-500"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button type="submit" className="w-[440px] h-[71px] bg-rose-500 rounded text-white text-2xl font-extrabold font-['Montserrat']">
              Login
            </button>
          </form>
          <div className="relative mt-4">
            <span className="text-black text-2xl font-medium font-['Montserrat']">Don’t have an account?</span>
            <Link to="/signup-page" className="absolute left-[259px] top-0 text-rose-500 text-2xl font-bold font-['Montserrat']">
              Sign Up
            </Link>
          </div>
        </div>
          <div className="w-[532px] h-full bg-rose-500 rounded-tr-[20px] rounded-br-[20px]" />
      </div>
    </div>
  );
};

export default LoginPage;
