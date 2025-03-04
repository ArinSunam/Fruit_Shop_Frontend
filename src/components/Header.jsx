import React, { useState } from 'react'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {

  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const trackScrollValue = window.scrollY
    trackScrollValue > 10 ? setScrolled(true) : setScrolled(false)
  }

  window.addEventListener('scroll', handleScroll)


  return (
    <header className={`fixed top-0  ${scrolled ? "bg-[#051922]" : "bg-transparent"} w-[100vw] py-[15px] text-white`}>
      <div className='mx-auto w-[1110px] flex items-center justify-between'>
        <h1 className='text-[#F28123] text-[32px] font-bold cursor-pointer' onClick={() => nav('/')}>Fruitkha</h1>

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
