import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { RiDeleteBinFill } from "react-icons/ri";
import Card from 'react-bootstrap/Card';
import { useAuth } from "../Firebase/Utils/AuthContext";

// Icons
import { FaThumbsDown, FaThumbsUp, FaEdit } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function Event({ id, event, desc, count, open, setOpen }) {
  const [hide, setHide] = useState(" ");
  const { userDetails } = useAuth();
  return (
    <Card className={`EventCard bg-[#d7d5ff] ${hide}`}>
      <Card.Header className="h-[4rem] w-[100%] flex justify-around items-center bg-white">
        <span className="w-[40%] font-semibold text-[1rem] text-[#4f46e5]">{event}</span>
        {
          userDetails.role == 'admin' ?
            <>
              <FaEdit className="text-xl hover:text-[#4f46e5]"/>
              <RiDeleteBinFill
                onClick={(e) => {
                  e.preventDefault();
                  setHide("hidden");
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