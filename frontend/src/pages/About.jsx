import React from 'react'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        
          <p>ABOUT <span className='text-gray-700 font-medium '>US</span></p>
        </div>
         <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
             <div className='flex flex-col jusitify-center gap-6 md:w-2/4 text-sm text-gray-600'>
             <p>At CareConnect, our mission is to simplify the way people access healthcare. We understand how difficult it can be to find the right doctor and schedule appointments, especially during busy days or in emergencies. That’s why we created a seamless platform that brings patients and healthcare providers together in just a few taps.</p>
             <p>Our app offers real-time doctor availability, instant appointment booking, and secure access to medical information—all in one place. Whether you need a general consultation or a specialist, our verified doctors are here to provide trusted care at your convenience. We prioritize your comfort and ensure you get the help you need when you need it most.</p>
             <b className='text-gray-800'>Our Vision</b>
             <p>Our app offers real-time doctor availability, instant appointment booking, and secure access to medical information—all in one place. Whether you need a general consultation or a specialist, our verified doctors are here to provide trusted care at your convenience. We prioritize your comfort and ensure you get the help you need when you need it most. </p>
        </div>
      </div>
      <div className='text-xl my-4 '>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
      </div>
      <div className='flex flex-col md:flex-row mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>EFFECIENCY</b>
          <p>We streamline healthcare access to save your time and effort.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>CONVINIENCE</b>
          <p>Book appointments and consult with doctors anytime, from anywhere.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer '>
          <b>PERSONALIZATION</b>
          <p>Your care is tailored to your unique health needs and preferences.</p>
        </div>
      </div>
    </div>
  )
}

export default About