// Libraries
import React, {useEffect, useState} from "react";
import { useMediaQuery } from "react-responsive";
import { getEvents } from "../Firebase/Utils/events.utils.js";

// Components
import Event from "./Event";
import Header from "./Header.jsx";
import { Accordion } from "react-bootstrap";

// Data
import { EventList } from "../Data/Events.js";
import { useAuth } from "../Firebase/Utils/AuthContext.jsx";

export default function Events({selPg,setSelPg}) {
  const [open, setOpen] = useState(0);
  const [eventList, setEventList] = useState([])
  const{user,userDetails} = useAuth();
  useEffect(()=>{getEvents(user.uid,userDetails.role).then((events)=>setEventList(events)).catch((e)=>console.log(e))},[])
  return (
    <div className="Events">
      <Header setSelPg={setSelPg}/>
      <Accordion className="Event" activeKey={open}>
        {eventList.map((E) => (
          <Event
            key={E.id}
            id={E.id}
            name={E.name}
            desc={E.desc}
            date={E.date}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </Accordion>
    </div>
  );
}
