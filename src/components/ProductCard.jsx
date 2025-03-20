import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { BaseUrl } from '../features/constant'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ el }) => {

  const nav = useNavigate()
  return (
    <div className="px-[30px] py-[20px]  flex flex-col items-center gap-[10px] shadow-black/25 shadow-lg hover:shadow-none" >
      <img src={`${BaseUrl}${el.image}`} alt="" width={261} height={261} className='size-[261px] object-cover' />
      <h2 className="text-[20px] font-semibold leading-[2.25rem] cursor-pointer" onClick={() => nav(`/shop/${el._id}`)}>{el.title}</h2>
      <p className="text-[#555] text-[15px]">Per Kg</p>
      <h1 className="text-[30px] font-bold leading-[180%]">{el.price}</h1>
      <button className="bg-primary text-body flex items-center gap-3 rounded-[50px] py-[10px] px-[30px] ">< FaShoppingCart /> Add to cart</button>

    </div>
  )
}

export default ProductCard
