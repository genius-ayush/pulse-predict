import BottomNav from '@/components/Markets/BottomNav'
import MarketPage from '@/components/Markets/marketPage'
import Navbar from '@/components/Markets/Navbar'
import React from 'react'

function Market() {
  return (
    <div className='bg-[#112121]'>
      <Navbar/>
      <MarketPage/>
      <BottomNav/>
    </div>
  )
}

export default Market