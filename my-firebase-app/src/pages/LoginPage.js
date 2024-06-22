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
    <>

    <div className='w-full h-screen flex justify-center items-center bg-red-100'>

      <div className='flex relative w-[1065px] h-[722px] bg-white rounded-[20px]'>

        <div className='flex flex-col justify-center items-start p-10 gap-6'>
          <div className='relative'>
            <h2 className="text-rose-500 text-4xl font-extrabold font-['Montserrat']">Login</h2>
            <p className="text-black text-xl font-light font-['Montserrat'] mt-2">Enter your account details</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-400 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-400 text-rose-400"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-400 pl-6 pr-16 text-m font-medium font-['Montserrat'] placeholder-rose-400 text-rose-400"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-10 py-2 text-sm text-rose-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword? <b>Hide</b> : <b>Show</b>} 
              </button>
            </div>
            <button type="submit" className="w-[440px] h-[71px] bg-rose-500 rounded text-white text-xl font-extrabold font-['Montserrat']">
              Login
            </button>
          </form> 
            <p className="text-black text-xl font-light  font-['Montserrat']">Don’t have an account?
              <Link to="/signup-page" className="absolute pl-2 text-rose-500 text-xl font-bold font-['Montserrat']">
                Sign Up
            </Link>
            </p>
        </div>
 
        <div>
          <div className='ml-4 w-[532px] h-full bg-rose-500 rounded-tr-[20px] rounded-br-[20px]' />
        </div>

      </div>
    </div>
    </>
  );
};

export default LoginPage;
