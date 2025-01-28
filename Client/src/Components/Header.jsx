// Libraries
import React, { useState } from 'react'

// Components
import { MobileNavbar, LaptopNavbar } from './Navbar';

// Icons
import { RiSearchLine } from "react-icons/ri";
import AddEvent from './AddEvent';


export default function Header({ setSelPg, setSearchInput }) {
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  return (
    <header className='header'>
      <form action="#" className='searchBar'>
        <RiSearchLine className='text-[#bec3cb] text-xl' />
        <input
          type="text"
          placeholder='Search events ...'
          className='h-[100%] w-[90%] outline-none'
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      <LaptopNavbar setShowAddEventForm={setShowAddEventForm} />
      <MobileNavbar setSelPg={setSelPg} setShowAddEventForm={setShowAddEventForm} />
      <AddEvent show={showAddEventForm} onHide={() => setShowAddEventForm(false)} />
    </header>
  )
}
