// Components
import {MobileNavbar, LaptopNavbar} from './Navbar';

// Libraries
import React from 'react'

// Icons
import { RiSearchLine } from "react-icons/ri";


export default function Header({setSelPg}) {
  return (
    <header className='header'>
      <form action="#" className='searchBar'>
        <RiSearchLine className='text-[#bec3cb] text-xl' />
        <input type="text" placeholder='Search events ...' className='h-[100%] w-[90%] outline-none' />
      </form>
      <LaptopNavbar/>
      <MobileNavbar setSelPg={setSelPg}/>
    </header>
  )
}
