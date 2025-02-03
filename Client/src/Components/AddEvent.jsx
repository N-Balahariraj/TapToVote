// Libraries
import React, { useState } from 'react'

// Firebase
import { setEvent, updateEvent } from '../Firebase/Utils/events.utils';
import { mapEvent } from '../Firebase/Utils/users.utils';
import { useAuth } from '../ContextAPIs/AuthContext';

// External components
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { useRefresh } from '../ContextAPIs/RefreshContext';

export default function AddEvent({show, onHide, event}) {
    const {user,userDetails} = useAuth()
    const {triggerRefresh} = useRefresh();
    return (
        <>
            <ToastContainer/>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <form
                    className='h-[30rem] flex flex-col px-5 py-2 font-roboto text-sm'
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const title = e.target.elements.eventTitle.value
                        const date = e.target.elements.eventDate.value
                        const desc = e.target.elements.eventDesc.value
                        if(title == '' | date == '' | desc == ''){
                            toast('All fields are mandatory', { type: 'error' })
                            return
                        }
                        if(title == event?.name & date == event?.date & desc == event?.desc){
                            toast('Do some changes to update', {type: 'warning'})
                            return
                        }
                        try {
                            if(event){
                                await updateEvent(event.id,title,date,desc)
                                toast('Event updated successfully',{type: 'success'})
                            }
                            else{
                                await setEvent(user.uid, title, date, desc)
                                await mapEvent(user.uid, title+'-'+date)
                                toast('Event added successfully', { type: 'success' })
                            }
                        } catch (e) {
                            toast(e.message, { type: 'error' })
                        }
                        finally{
                            triggerRefresh(prev => !prev)
                            onHide()
                        }
                    }}
                >
                    <label htmlFor="eventTitle" className='m-2 text-xl font-nunito'>Title</label>
                    <input type="text" name='eventTitle' defaultValue={event?.name} className='sign-input' />
                    <label htmlFor="eventDate" className='m-2 text-xl font-nunito'>Date</label>
                    <input type="date" name='eventDate' defaultValue={event?.date} className='sign-input' />
                    <label htmlFor="eventDesc" className='m-2 text-xl font-nunito'>Description</label>
                    <textarea name="eventDesc" defaultValue={event?.desc} className='sign-input' rows={10}></textarea>
                    <button type='submit' className='sign-btn'>{event?'Edit':'Add +'}</button>
                </form>
            </Modal>
        </>
    )
}
