import React from 'react'
import { FaShippingFast, FaPhoneVolume, FaSync } from "react-icons/fa";

const Services = () => {

  const serviceData = [
    {
      icon: <FaShippingFast className='text-[34px]' />,
      title: 'Free Shipping',
      desc: 'When order over $30'
    },
    {
      icon: <FaPhoneVolume className='text-[24px]' />,
      title: '24/7 Support',
      desc: 'Get support all day'
    },
    {
      icon: <FaSync className='text-[24px]' />,
      title: 'Refund',
      desc: 'No refunds'
    },
  ]

  return (
    <div className='bg-[#f5f5f5] py-[80px]'>
      <div className='flex flex-col sm:flex-row sm:flex-wrap items-center justify-between mycontainer gap-y-7 gap-x-4 '>
        {serviceData.map((el, i) => (
          <div className={`flex items-center ${i === 2 && "pr-12"}`}>
            <div className='text-[#F28123] mr-[15px] border-2 border-[#F28123] border-dotted rounded-full size-[65px] flex items-center justify-center' >{el.icon}</div>
            <div className='text-[#051922] space-y-1'>
              <h3 className='text-lg font-bold '>{el.title}</h3>
              <p className='text-sm font'>{el.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Services
