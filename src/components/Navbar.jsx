import React from 'react'
import { NavLink } from "react-router"
function Navbar() {
  return (
     <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <NavLink to="/" >PASTE</NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold bg-red-500 px-3 py-2 rounded"
                : "text-blue-200 hover:text-white px-3 py-2 rounded transition"
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar