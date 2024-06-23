import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Rename the import to ScrollLink
import { Link as RouterLink } from 'react-router-dom'; // Rename the import to RouterLink

const NavBar = () => {
    return (
        <nav>
            <div className="flex fixed top-0 left-0 right-0 z-50 justify-between items-center px-48 py-4 mx-auto max-w-full bg-white shadow-md">
                <div className="flex items-center">
                    <h1 className="text-3xl font-bold text-red-400">LOGO</h1>
                </div>
                <div className="flex space-x-6 items-center">
                    <ScrollLink
                        className="font-medium font-montserrat hover:text-red-400 transition-colors duration-300 cursor-pointer"
                        to="home"
                        smooth={true}
                        duration={500}
                    >
                        Home
                    </ScrollLink>
                    <ScrollLink
                        className="font-medium font-montserrat hover:text-red-400 transition-colors duration-300 cursor-pointer"
                        to="about"
                        smooth={true}
                        duration={500}
                    >
                        About
                    </ScrollLink>
                    <ScrollLink
                        className="font-medium font-montserrat hover:text-red-400 transition-colors duration-300 cursor-pointer"
                        to="services"
                        smooth={true}
                        duration={500}
                    >
                        Services
                    </ScrollLink>
                    <ScrollLink
                        className="font-medium font-montserrat hover:text-red-400 transition-colors duration-300 cursor-pointer"
                        to="contact"
                        smooth={true}
                        duration={500}
                    >
                        Contact
                    </ScrollLink>
                    <button className="w-24 h-10 bg-red-400 text-white rounded transition-transform transform font-medium hover:bg-slate-500">
                        <RouterLink to="/login-page" className="block w-full font-montserrat h-full text-center leading-10 text-white">
                            Login
                        </RouterLink>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
