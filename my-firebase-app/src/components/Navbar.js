import React from 'react'
import { useNavigate, Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
        <header>
            <div className='flex space-x-20 sticky top-0 bg-red-50 px-10 py-6'>
                <h1 className='text-4xl font-bold text-indigo-200'>LOGO</h1>
                <div className='flex space-x-3'>
                    <p><Link to=''>Home</Link></p>
                    <p>About</p>
                    <p>Services</p>
                    <button className='w-20 p-2 bg-blue-500 text-white rounded'><Link to='../pages/LoginPage.js'>Login</Link></button>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar
