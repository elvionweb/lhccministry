import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import ScrollToTopButton from '../components/common/ScrollToTopButton'
import Footer from '../components/common/Footer'


const PublicLayout = () => {
  return (
    <>
    <Navbar />
    <main className='pt-18'>
        <Outlet />
    </main>
    <ScrollToTopButton />
    <Footer />
    </>
  )
}

export default PublicLayout