// Libraries
import React, {useEffect, useState} from "react";
import { useMediaQuery } from "react-responsive";

// Components
import Event from "./Event";
import Header from "./Header.jsx";
import { Accordion } from "react-bootstrap";

// Data
import { EventList } from "../Data/Events.js";

export default function Events({selPg,setSelPg}) {
  const [open, setOpen] = useState(0);

  return (
    <div className="Events">
      <Header setSelPg={setSelPg}/>
      <Accordion className="Event" activeKey={open}>
        {EventList.map((E) => (
          <Event
            key={E.id}
            id={E.id}
            event={E.Title}
            desc={E.Desc}
            count={E.count}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </Accordion>
    </div>
  );
}
