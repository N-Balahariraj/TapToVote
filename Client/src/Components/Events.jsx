// Libraries
import React, {useEffect, useState} from "react";

// Components
import Event from "./Event";
import Header from "./Header.jsx";

// External Components
import { Accordion } from "react-bootstrap";

// Firebase
import { getEvents } from "../Firebase/Utils/events.utils.js";
import { useAuth } from "../ContextAPIs/AuthContext.jsx";
import { useRefresh } from "../ContextAPIs/RefreshContext.jsx";

export default function Events({selPg,setSelPg}) {
  const [open, setOpen] = useState(0);
  const [eventList, setEventList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const{user,userDetails} = useAuth();
  const{refresh} = useRefresh();
  useEffect(()=>{getEvents(user.uid,userDetails.role).then((events)=>setEventList(events)).catch((e)=>console.log(e))},[refresh])
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
