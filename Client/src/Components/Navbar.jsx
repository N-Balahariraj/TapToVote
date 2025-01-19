// Libraries
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive'
import { useAuth } from '../Firebase/Utils/AuthContext';

// Components
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';

//Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { TbHistoryToggle } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io"

export function MobileNavbar({ setSelPg, setShowAddEventForm }) {
  const [show, setShow] = useState(false)
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  const { userDetails } = useAuth()

  return (
    isMobile &&
    <nav className='mobNav'>
      <Button onClick={() => setShow(true)} className='bg-[#4f46e5] hover:bg-[#655ee7]'>
        <RxHamburgerMenu />
      </Button>
      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TapToVote</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className='flex flex-col justify-around h-[30%] w-[100%] '>
            <a href="#" className='hover:text-[#4f46e5] border-b-2 pb-2'>Community</a>
            <a href="#" className='hover:text-[#4f46e5] border-b-2 pb-2'>Support</a>
            <div className='h-[25%] flex justify-around'>
              {userDetails.role == 'admin' && <button className='w-[40%] h-[100%] text-[white] bg-[#4f46e5] hover:bg-[#655ee7] rounded-lg p-1' onClick={()=>setShowAddEventForm(true)}>+ New event</button>}
              <button className='flex justify-center items-center w-[15%] h-[100%] text-[white] text-2xl bg-[#4f46e5] hover:bg-[#655ee7] rounded-lg p-1'
                onClick={() => { setSelPg('Account'); setShow(false) }}>
                <TbHistoryToggle />
              </button>
              <button className='flex justify-center items-center w-[15%] h-[100%] text-[white] text-3xl bg-[#4f46e5] hover:bg-[#655ee7] rounded-lg p-1'
                onClick={() => { setSelPg('People'); setShow(false) }}>
                <IoIosPeople />
              </button>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </nav>
  );
}

export function LaptopNavbar({setShowAddEventForm}) {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  const { userDetails } = useAuth()

  return (
    !isMobile &&
    <nav className='lapNav'>
      <a href="#" className='hover:text-[#4f46e5]'>Community</a>
      <a href="#" className='hover:text-[#4f46e5]'>Support</a>
      {userDetails.role == 'admin' && <button className='w-[40%] h-[65%] text-[white] bg-[#4f46e5] hover:bg-[#655ee7] rounded-lg p-1' onClick={()=>setShowAddEventForm(true)}>+ New event</button>}
    </nav>
  );
}