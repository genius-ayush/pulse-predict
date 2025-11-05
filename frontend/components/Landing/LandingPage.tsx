import React from 'react'
import { Header } from './Header'
import Footer from './Footer'
import Hero from './Hero'
import Features from './Features'
import FAQs from './FAQs'
import CallToAction from './CallToAction'
import CTASection from './CallToAction'

function LandingPage() {
  return (
    <div className='bg-[#112121] text-white'>
        <Header/>
        <Hero/>
        <Features/>
        <FAQs/>
        <CTASection/>
        <Footer/>
    </div>
  )
}

export default LandingPage