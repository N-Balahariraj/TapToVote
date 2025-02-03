// Libraries
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

// Components
import AddEvent from "./AddEvent";

// External Components
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card';
import { toast, ToastContainer } from "react-toastify";

// Firebase
import { deleteEvent, updateVoteCount } from "../Firebase/Utils/events.utils";
import { mapEvent } from "../Firebase/Utils/users.utils";
import { useAuth } from "../ContextAPIs/AuthContext";

// Icons
import { FaThumbsDown, FaThumbsUp, FaEdit } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";
import { useRefresh } from "../ContextAPIs/RefreshContext";

export default function Event({ id, name, desc, date, open, setOpen }) {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [showConformation, setShowConformation] = useState(false)
  const [hide, setHide] = useState(" ")
  const [isVotable, setIsVotable] = useState(false)
  const [upVote, setUpVote] = useState(0)
  const [downVote, setDownVote] = useState(0)
  const { user, userDetails } = useAuth();
  const {refresh,triggerRefresh} = useRefresh();

  useEffect(()=>{
    userDetails.role === 'user' && userDetails.events.some(event => event.eid === id && setIsVotable(event.vote))
  },[user,userDetails,refresh])

  return (
    <>
      <ToastContainer/>
      <Card className={`EventCard bg-[#d7d5ff] ${hide}`}>
        <Card.Header className="h-[4rem] w-[100%] flex justify-around items-center bg-white">
          <Modal
            show={showConformation}
            onHide={() => { setShowConformation(false) }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <p className="h-[8rem] p-3 flex flex-col">
              <span className="h-[50%] ">Are you sure to vote? You cannot change the vote!</span>
              <button
                className="h-[50%] border-2 rounded-md bg-[#4f46e5] hover:bg-[#655ee7] text-white text-md"
                onClick={async (e) => {
                  e.preventDefault();
                  setShowConformation(false)
                  try {
                    if (upVote) {
                      await updateVoteCount(id, upVote)
                      await mapEvent(user.uid, { eid: id, vote: upVote })
                      toast(`Up voted for ${name}`,{type:'success'})
                    }
                    if (downVote) {
                      await updateVoteCount(id, downVote)
                      await mapEvent(user.uid, { eid: id, vote: downVote })
                      toast(`Down voted for ${name}`,{type:'success'})
                    }
                  }
                  catch (e) {
                    toast(e.message, { type: 'error' })
                  }
                  finally{
                    triggerRefresh(prev => !prev)
                  }
                }}
              >
                Confirm
              </button>
            </p>
          </Modal>
          <span className={`${isMobile?'w-[50%]':'w-[30%]' } font-semibold text-[1rem] text-[#4f46e5]`}>{name}</span>
          <span className={`${isMobile?'hidden':'w-[20%]'} font-semibold text-[1rem] text-[#4f46e5]`}>{date}</span>
          {
            userDetails.role == 'admin' ?
              <>
                <AddEvent show={showAddEventForm} onHide={() => setShowAddEventForm(false)} event={{id,name,date,desc}} />
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
                      toast('Deletion successfull', { type: 'success' })
                    }
                    catch (error) {
                      toast(error.message, { type: 'error' })
                    }
                    finally{
                      triggerRefresh(prev => !prev)
                    }
                  }}
                  className="text-xl hover:text-[#4f46e5]"
                />
              </> :
              <>
                <button
                  className={`${!isVotable && 'hover:border-[#4f46e5]'} border-2 rounded-full content-center h-10 w-10`}
                  disabled = {isVotable}
                  onClick={() => {
                    setShowConformation(true)
                    setDownVote(0);
                    setUpVote(upVote == 0 ? 1 : 0);
                  }}>
                  <FaThumbsUp className={`mx-auto ${upVote || isVotable == 1 && "text-[#4f46e5]"}`} />
                </button>
                <button
                  className={`${!isVotable && 'hover:border-[#4f46e5]'} border-2 rounded-full content-center h-10 w-10`}
                  disabled = {isVotable}
                  onClick={() => {
                    setShowConformation(true)
                    setUpVote(0);
                    setDownVote(downVote == 0 ? -1 : 0);
                  }} >
                  <FaThumbsDown className={`mx-auto ${downVote || isVotable == -1 && "text-[#4f46e5]"}`} />
                </button>
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
    </>
  );
}