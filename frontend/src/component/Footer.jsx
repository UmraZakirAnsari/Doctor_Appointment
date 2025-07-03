import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14'>
            {/* -------------------left section------------ */}
            <div >
                    <img  className='mb-5 w-40 'src={assets.logo} alt=''/>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6 '>We are committed to providing easy and reliable access to quality healthcare. Book appointments, consult trusted doctors, and take charge of your well-being—all in one place</p>
            </div>
             {/* -------------------mid section------------ */}
            <div>
                <p className='text-xl font-medium mb-5 '>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home </li>
                    <li>About Us </li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
             {/* -------------------right  section------------ */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 8707684722</li>
                    <li> ansariumrazakir@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* ---------CopyRight------------ */}
        <div>
           <hr/>
           <p className='py-5 text-sm text-center'> CopyRight 2025@ AnsariCare-all Right Reserved </p>
        </div>
    </div>
  )
}

export default Footer