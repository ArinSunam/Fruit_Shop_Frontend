import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronRight, FaFacebookF, FaInstagram, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const pageData = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'About Us',
    link: '#'
  },
  {
    title: 'Shop',
    link: '/shop'
  },
  {
    title: 'Contact',
    link: '#'
  }

]

const socialData = [
  {
    icons: <FaXTwitter />,
    link: '#'
  },
  {
    icons: <FaFacebookF />,
    link: '#'
  },
  {
    icons: <FaLinkedin />,
    link: '#'
  },
  {
    icons: <FaInstagram />,
    link: '#'
  },
  {
    icons: <FaGithub />,
    link: '#'
  }
]

const Footer = () => {
  return (
    <footer className='bg-[#051922]  text-white'>
      <section className='mycontainer grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-5 py-[80px]'>

        {/* ABOUT US */}
        <section>
          <div className='mb-[14px]'>
            <h1 className='footerHead'>About Us</h1>
            <div className='mt-[14px] bg-[#F28123] h-0.5 w-8' />
          </div>
          <p className='opacity-75'>Ut enim ad minim veniam perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.</p>

        </section>

        {/* Get In Touch */}
        <section>
          <div className='mb-[14px]'>
            <h1 className='footerHead'>Get In Touch</h1>
            <div className='mt-[14px] bg-[#F28123] h-0.5 w-8' />
          </div>

          <ul className='opacity-75 space-y-2.5'>
            <li>
              <Link to="https://www.google.com/maps/place/Agile+Institute/@27.7027882,85.3183314,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb190aed3a1583:0xec5c63ce98efff78!8m2!3d27.7027835!4d85.3229448!16s%2Fg%2F11v0pqd9ly?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D">
                New Plaza, Kathmandu
              </Link>
            </li>
            <li>
              <Link to="mailto:zenismaharjan504@gmail.com">
                info@fruitkha.com
              </Link>
            </li>
            <li>
              <Link to="tel:9876543210">
                9876543210
              </Link>
            </li>
          </ul>
        </section>

        {/* Pages */}
        <section>
          <div className='mb-[14px]'>
            <h1 className='footerHead'>Pages</h1>
            <div className='mt-[14px] bg-[#F28123] h-0.5 w-8' />
          </div>

          <ul className='opacity-75 space-y-2.5 '>

            {
              pageData.map((el, i) => (
                <li key={i} className='flex items-baseline gap-2'>
                  <FaChevronRight className='text-[#F28123] text-[10px]' />
                  <Link to={el.link}>
                    {el.title}
                  </Link>

                </li>
              ))
            }


          </ul>
        </section>

        {/* SUBSCRIBE */}
        <section>
          <div className='mb-[14px]'>
            <h1 className='footerHead'>Subscribe</h1>
            <div className='mt-[14px] bg-[#F28123] h-0.5 w-8' />
          </div>
          <p className='opacity-75'>Subscribe to our mailing list to get the latest updates.</p>
          <div className='flex gap-1 mt-[18px]'>
            <input
              type="text"
              placeholder='Email'
              className='p-[15px] rounded-l-[5px] bg-[#012738]'
            />
            <button className='text-primary text-sm py-[14px] px-5 rounded-r-[3px] bg-[#012738]'><FaPaperPlane /></button>
          </div>

        </section>


      </section>

      <hr className='opacity-30' />

      <section className='text-sm mycontainer py-4 opacity-75 flex items-center justify-between '>
        <div className='space-y-2'>
          <p>Copyright &copy; 2025 - <span className='text-primary font-bold'>Rabbit Studio</span>, All rights reserved</p>
          <p>Distributed by - <span className='text-primary font-bold'>Agile Institute</span></p>
        </div>

        <nav className='flex gap-6'>
          {
            socialData.map((el, i) => (
              <Link to={el.link}>{el.icons}</Link>
            ))
          }
        </nav>
      </section>
    </footer>
  )
}

export default Footer
