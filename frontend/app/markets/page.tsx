import MarketPage from '@/components/Markets/marketPage'
import Navbar from '@/components/Markets/Navbar'
import React from 'react'

function Market() {
  return (
    <div className='bg-[#112121]'>
      <Navbar/>
      <MarketPage/>
    </div>
  )
}

export default Market