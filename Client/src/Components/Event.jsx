import React, {useState} from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

// Icons
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function Event({ id, event, desc, count, open, setOpen}) {
  return (
    <Card className={"EventCard bg-[#d7d5ff]"}>
      <Card.Header className="h-[4rem] w-[100%] flex justify-around items-center bg-white">
          <span className="w-[40%] font-semibold text-[1rem] text-[#4f46e5]">{event}</span>
          <FaThumbsUp className="hover:text-[#4f46e5]"/>
          <FaThumbsDown className="hover:text-[#4f46e5]"/>
          <span onClick={()=>{setOpen(id)}} >
            {id==open ? <FaAngleUp /> : <FaAngleDown />}
          </span>
      </Card.Header>
      <Accordion.Collapse eventKey={id}>
        <Card.Body>{desc}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}