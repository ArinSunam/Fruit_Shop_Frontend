import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const RootLayout = () => {

  const pathname = useLocation().pathname
  console.log(pathname)

  return (
    <>

      {pathname !== '/login' && <Header />}
      <Outlet />
      {pathname !== '/login' && <Footer />}

    </>
  )
}

export default RootLayout
