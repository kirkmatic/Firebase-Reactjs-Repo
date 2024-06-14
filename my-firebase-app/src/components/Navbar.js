import React from 'react'
import { useNavigate, Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
<nav >
  <div className="flex sticky top-0 z-50 justify-between items-center px-6 py-4 mx-auto max-w-screen-xl">
    <div className="flex items-center">
      <h1 className="text-3xl font-bold text-red-400">LOGO</h1>
    </div>
    <nav className="flex space-x-6 items-center">
      <p className="font-medium hover:text-red-400 transition-colors duration-300">
        <Link to="/">Home</Link>
      </p>
      <p className="font-medium hover:text-red-400 transition-colors duration-300">
        <Link to="/about">About</Link>
      </p>
      <p className="font-medium hover:text-red-400 transition-colors duration-300">
        <Link to="/services">Services</Link>
      </p>
      <button className="w-24 h-10 bg-red-400 text-white rounded transition-transform transform font-medium hover:bg-slate-500">
        <Link to="/login" className="block w-full h-full text-center leading-10">Login</Link>
      </button>
    </nav>
  </div>
</nav>
    </>
  )
}

export default Navbar
