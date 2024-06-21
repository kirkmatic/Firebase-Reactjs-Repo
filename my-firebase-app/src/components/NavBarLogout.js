import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../authentications/Firebase';

const NavBarLogout = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        auth.signOut().then(() => {
          navigate('/login-page'); // Navigate to login page after logging out
        }).catch((error) => {
          console.error('Error logging out:', error);
        });
      };

    return (
        <>
            <nav>
                <div className="flex sticky top-0 z-50 justify-between items-center px-1 py-4 mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-red-400">LOGO</h1>
                    </div>
                    <div className="flex space-x-6 items-center">
                    <button 
                        className="w-24 h-10 bg-red-400 text-white rounded transition-transform transform font-medium hover:bg-slate-500"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBarLogout
