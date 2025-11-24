import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="w-full h-[45px] flex justify-center gap-16 items-center p-4 bg-gray-800 fixed z-10">
      <NavLink
      to={'/'}
      className={({isActive}) => 
          isActive? "text-blue-500 font-semibold text-xl" : "text-white font-medium text-xl"
      }
      >
        Home
      </NavLink>
      <NavLink
        to={'/pastes'}
        className={({isActive}) => 
          isActive? "text-blue-500 font-semibold text-xl" : "text-white font-medium text-xl"
      }
      >
        Notes
      </NavLink>
    </div>
  )
}

export default NavBar;