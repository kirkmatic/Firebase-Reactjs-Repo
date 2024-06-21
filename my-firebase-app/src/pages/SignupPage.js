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
    {/* <div className="flex justify-center items-center h-screen bg-gray-100">
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
    </div> */}

    <div className='w-full h-screen flex justify-center items-center bg-red-100'>
      <div className='flex relative w-[1065px] h-[722px] bg-white rounded-[20px]'>

        <div>
          <div className=' w-[532px] h-full bg-rose-500 rounded-tl-[20px] rounded-bl-[20px]' />
        </div>

        <div className='flex flex-col justify-center items-start p-10 gap-6'>

          <div className='relative'>
            <h2 className="text-rose-500 text-4xl font-extrabold font-['Montserrat']">Sign Up</h2>
            <p className="text-black text-xl font-light font-['Montserrat'] mt-2">Fill up your account info</p>
          </div>


          <form onSubmit={handleSignup} className="space-y-5">
            <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-500 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-500"
            required
            />
            <input
            type="text"
            placeholder="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-500 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-500"
            required
            />
            <input
            type="email"
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-500 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-500"
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-500 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-500"
            required
            />
            <select value={Role} onChange={(e) => setRole(e.target.value)} className="w-[440px] h-[68px] bg-zinc-50 rounded border-2 border-rose-500 pl-6 text-m font-medium font-['Montserrat'] placeholder-rose-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-[440px] h-[71px] bg-rose-500 rounded text-white text-xl font-extrabold font-['Montserrat']">Sign Up</button>
          </form>
            <p className="text-black text-xl font-light pl-2 font-['Montserrat']"> Already have an account?  
                <Link to="/login-page" className="absolute pl-2 text-rose-500 text-xl font-bold font-['Montserrat']">
                  Login
              </Link>
              </p>
        </div>



      </div>
    </div>
  </>
  )
}

export default SignupPage
