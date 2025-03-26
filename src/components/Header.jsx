import React, { useState } from 'react';
import { FaPowerOff, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl } from '../features/constant';
import { BiChevronDown } from 'react-icons/bi';
import { useLogoutMutation } from '../features/AuthApi';
import { clearAll } from '../features/UserSlice';
import { toast } from 'react-toastify';
import Cart from './cart';

const Header = () => {


  const [logout] = useLogoutMutation();
  const token = useSelector((store) => store?.userInfo?.user?.accessToken) || null;
  const loggedInUser = token ? useSelector((store) => store?.userInfo?.user?.data) : null;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileItems, setProfileItems] = useState(false);
  const [cartOpen, setCartOpen] = useState(false)

  const onLogout = async () => {
    await logout();
    dispatch(clearAll());
    toast.success("Successfully logged out");
    nav("/login");
  };

  const handleScroll = () => {
    const trackScrollValue = window.scrollY;
    trackScrollValue > 10 ? setScrolled(true) : setScrolled(false);
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={`fixed top-0  ${scrolled ? "bg-[#051922]" : "bg-transparent"} w-[100vw] py-[15px] text-white`}>
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
      <div className='mycontainer mx-auto flex items-center justify-between'>
        <h1 className='text-[#F28123] text-[32px] font-bold cursor-pointer' onClick={() => nav('/')}>Fruitkha</h1>

        <div className='hidden lg:block'>
          <nav className='flex items-center gap-8 font-semibold'>
            <NavLink to="/" className={({ isActive }) => `${isActive && "text-[#F28123] "}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${isActive && "text-[#F28123]"}`}>About Us</NavLink>
            <NavLink to="/shop" className={({ isActive }) => `${isActive && "text-[#F28123]"}`}>Shop</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${isActive && "text-[#F28123]"}`}>Contact Us</NavLink>
          </nav>
        </div>

        {token ? (
          <div className='hidden lg:block relative'>
            <div className='flex items-center gap-6'>
              <FaShoppingCart className='cursor-pointer' onClick={() => setCartOpen(true)} />

              <div className='flex items-center gap-1 cursor-pointer' onClick={() => setProfileItems(!profileItems)}>
                {loggedInUser?.profile_pic ? (
                  <img
                    src={`${BaseUrl}${loggedInUser.profile_pic}`}
                    alt='profile pic'
                    className='size-[36px] object-cover rounded-full border-2 border-secondary'
                  />
                ) : (
                  <FaRegUserCircle className='size-[36px]' />
                )}
                <BiChevronDown className={`${profileItems && "rotate-180 "}`} />
              </div>
            </div>
            {profileItems && (
              <div className='absolute top-10 w-[150px] bg-white p-1 rounded-md text-[#777]'>
                <button className='px-4 py-2 flex items-center gap-2 cursor-pointer'>
                  <FaRegUserCircle />
                  <p>My Profile</p>
                </button>

                <button className='px-4 py-2 flex items-center gap-2 text-red-600 cursor-pointer' onClick={onLogout}>
                  <FaPowerOff />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className='bg-primary px-4 py-2 font-medium rounded-md cursor-pointer'
            onClick={() => nav("/login")}
          >
            Login
          </button>
        )}

        <div
          className='block lg:hidden text-3xl cursor-pointer'
          onClick={() => {
            setMenuOpen((prev) => !prev);
            console.log('state', menuOpen);
          }}
        >
          {menuOpen ? <ImCross /> : <GiHamburgerMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;