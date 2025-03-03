import React from 'react'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-[#051922] w-[100vw] py-[15px] text-white'>
      <div className='mx-auto w-[1110px] flex items-center justify-between'>
        <h1 className='text-[#F28123] text-[32px] font-bold'>Fruitkha</h1>

        <nav className='flex items-center gap-8 font-semibold'>
          <NavLink to="/" className={({ isActive }) => `${isActive && "text-[#F28123] "}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${isActive && "text-[#F28123]"}`}>About Us</NavLink>
          <Link>Shop</Link>
          <Link>Contact Us</Link>
        </nav>

        <div className='flex gap-6'>
          <FaShoppingCart />
          <FaSearch />
        </div>
      </div>
    </header>
  )
}

export default Header
