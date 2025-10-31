import React, { useContext, useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import { UserContext } from '../../context/UserContext';


const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    // ✅ Logout Handler
    const handleLogout = () => {
    localStorage.clear();
    if (clearUser) clearUser();
    navigate("/login");
    };

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-30 shadow-sm">
      {/* Left: Menu Icon (Mobile) */}
      <button
        className="lg:hidden text-gray-700 hover:text-black transition"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Center: Title */}
      <h2 className="text-lg font-semibold text-gray-800">Expense Tracker</h2>

      {/* Right: Navigation Links (Visible on md and larger) */}
      <div className="hidden lg:flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-violet-600 transition">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-violet-600 transition">
          Dashboard
        </Link>
        <Link to="/income" className="hover:text-violet-600 transition">
          Income
        </Link>
        <Link to="/expense" className="hover:text-violet-600 transition">
          Expense
        </Link>
        {/* ✅ Logout link */}
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="absolute top-[61px] left-0 w-64 bg-white shadow-md border-r border-gray-200">
          <SideMenu />
        </div>
      )}
    </div> 

  )
}

export default Navbar