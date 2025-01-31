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
  const [searchInput, setSearchInput] = useState('')
  const{user,userDetails} = useAuth();
  useEffect(()=>{getEvents(user.uid,userDetails.role).then((events)=>setEventList(events)).catch((e)=>console.log(e))},[])
  const filteredEvents = eventList.filter((event) =>
    event.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="Events">
      <Header setSelPg={setSelPg} setSearchInput={setSearchInput}/>
      <Accordion className="Event" activeKey={open}>
        {userDetails.role == 'user' && <span className="mt-3 border-2 rounded-md border-red-700 p-2 bg-red-100">Be coutious !. You can vote an event only once.</span>}
        {filteredEvents.map((E) => (
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
