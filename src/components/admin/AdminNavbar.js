import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-indigo-800 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">
          <span className="text-yellow-400">Admin</span> Panel
        </div>
        
        {/* Navbar Links */}
        <div className="space-x-8">
          <a href="#" className="text-white hover:text-yellow-400 transition duration-300">Dashboard</a>
          <a href="#" className="text-white hover:text-yellow-400 transition duration-300">Users</a>
          <a href="#" className="text-white hover:text-yellow-400 transition duration-300">Settings</a>
          <a href="#" className="text-white hover:text-yellow-400 transition duration-300">Reports</a>
        </div>
        
        {/* Profile Section */}
        <div className="relative">
          <button className="text-white flex items-center">
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Profile" className="w-8 h-8 rounded-full mr-2" />
            <span>John Doe</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden group-hover:block">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Profile</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-600 hover:text-white">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
