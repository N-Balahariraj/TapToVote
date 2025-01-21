import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { RiDeleteBinFill } from "react-icons/ri";
import Card from 'react-bootstrap/Card';
import { useAuth } from "../Firebase/Utils/AuthContext";
import AddEvent from "./AddEvent";

// Icons
import { FaThumbsDown, FaThumbsUp, FaEdit } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { deleteEvent } from "../Firebase/Utils/events.utils";
import { toast } from "react-toastify";

export default function Event({ id, name, desc, date, open, setOpen }) {
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [hide, setHide] = useState(" ")
  const { userDetails } = useAuth();
  const event = {id,name,date,desc}
  return (
    <Card className={`EventCard bg-[#d7d5ff] ${hide}`}>
      <Card.Header className="h-[4rem] w-[100%] flex justify-around items-center bg-white">
        <span className="w-[30%] font-semibold text-[1rem] text-[#4f46e5]">{name}</span>
        <span className="w-[20%] font-semibold text-[1rem] text-[#4f46e5]">{date}</span>
        {
          userDetails.role == 'admin' ?
            <>
              <AddEvent show={showAddEventForm} onHide={() => setShowAddEventForm(false)} event={event}/>
              <FaEdit
                onClick={() => {
                  setShowAddEventForm(true)
                }}
                className="text-xl hover:text-[#4f46e5]"
              />
              <RiDeleteBinFill
                onClick={async () => {
                  try {
                    await deleteEvent(id) 
                    setHide("hidden")
                    toast('Deletion successfull',{type:'success'})  
                  } 
                  catch (error) {
                    toast(error.message,{type:'error'})
                  }
                }}
                className="text-xl hover:text-[#4f46e5]"
              />
            </> :
            <>
              <FaThumbsUp className="hover:text-[#4f46e5]" />
              <FaThumbsDown className="hover:text-[#4f46e5]" />
            </>
        }
        <span onClick={() => { setOpen(id) }} >
          {id == open ? <FaAngleUp /> : <FaAngleDown />}
        </span>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{desc}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}