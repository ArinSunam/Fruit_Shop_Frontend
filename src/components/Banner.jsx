import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

  const nav = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center' style={{
      background: "linear-gradient(rgba(0,10,10,0.5),rgba(0,10,10,0.5)),url('https://i.pinimg.com/564x/c3/2b/09/c32b09c242df09b22a5537d8b5094389.jpg')",
      height: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }}>
      <h4 className='text-[#F28123] uppercase text-[15px] font-bold tracking-[7px]'>Fresh & Organic</h4>
      <h1 className='text-[64px] text-white font-black'>Delicious Seasonal Fruits</h1>

      <nav className='flex gap-3'>
        <button className='bg-[#F28123] px-[20px] py-[10px] text-white rounded-3xl'> Fruit Collection</button>
        <button className='border-2 border-[#F28123] px-[20px] py-[8px] text-white rounded-3xl cursor-pointer' onClick={() => nav('/about')}>About Us</button>
      </nav>
    </div>
  )
}

export default Banner
