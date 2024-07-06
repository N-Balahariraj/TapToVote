// Libraries
import React from "react";
import { useMediaQuery } from "react-responsive";

// Icons
import { MdLogout } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

// Data
import { peopleList } from "../Data/People";

export default function Account({ selPg, setSelPg }) {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  let isAccount = selPg == 'Account' ? 'Account' : 'hidden'
  return (
    <nav className={`${isMobile?isAccount:'Account'} `}>
      <header className="h-[10%] w-[100%] flex justify-between items-center">
        <img src="/Vote.png" alt="Logo" className="h-[100%]" />
        {isMobile && <IoIosClose className="text-2xl" onClick={()=>{setSelPg('Events')}}/>}
      </header>
      <dl className="h-[50%] w-[90%] flex flex-col flex-wrap overflow-y-auto">
        <dt className="text-lg font-bold mb-5">Your votes</dt>
        {peopleList.map((P) =>
          P.votes.map((e) => {
            return (
              <dd className="h-[10%] w-[100%] flex justify-around">
                <span className="h-[90%] w-[10%] border-2 rounded-lg text-center text-sm">{e.charAt(0)}</span>
                <span className="h-[90%] w-[75%]">{e}</span>
              </dd>
            );
          })
        )}
      </dl>
      <footer className="h-[10%] w-[200px] flex self-start items-center justify-between border-2 rounded-lg p-1">
        <img
          src="/pictures/me.jpg"
          alt="profile"
          className="h-[100%] rounded-full border-2"
        />
        <div className="h-[100%] w-[70%] flex flex-col">
          <span>N.Balahariraj</span>
          <span className="w-[100%] flex items-center gap-2 text-[#4f46e5]">
            LogOut
            <MdLogout className="font-extrabold" />
          </span>
        </div>
      </footer>
    </nav>
  );
}

