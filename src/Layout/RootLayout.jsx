import React, { useLayoutEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const RootLayout = () => {

  const pathname = useLocation().pathname
  console.log(pathname)

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>

      {pathname !== '/login' && <Header />}
      <Outlet />
      {pathname !== '/login' && <Footer />}

    </>
  )
}

export default RootLayout
