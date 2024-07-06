// Libraries
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

// Components
import Person from "./Person";

// Data
import { peopleList } from "../Data/People";

// Icons
import { IoIosClose } from "react-icons/io";

export default function People({ selPg,setSelPg }) {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  let isPeople=selPg=='People'?'People':'hidden'

  return (
    <div className={`${isMobile?isPeople:'People'}`}>
      <header className="h-[10%] w-[100%] flex justify-between items-center p-3">
        <span className="text-lg">People</span>
        {isMobile && <IoIosClose className="text-xl" onClick={() => { setSelPg('Events') }} />}
      </header>
      {peopleList.map((P) => (
        <Person
          key={P.id}
          id={P.id}
          profilePic={P.pic}
          mail={P.mail}
          name={P.name}
        />
      ))}
    </div>
  );
}
