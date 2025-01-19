import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { setEvent } from '../Firebase/Utils/events.utils';
import { toast, ToastContainer } from 'react-toastify';

export default function AddEvent(props) {
    return (
        <>
            <ToastContainer/>
            <Modal
                {...props}
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
                        try {
                            await setEvent(title, date, desc)
                            toast('Event added successfully', { type: 'success' })
                        } catch (e) {
                            toast(e.message, { type: 'error' })
                        }
                    }}
                >
                    <label htmlFor="eventTitle" className='m-2 text-xl font-nunito'>Title</label>
                    <input type="text" name='eventTitle' className='sign-input' />
                    <label htmlFor="eventDate" className='m-2 text-xl font-nunito'>Date</label>
                    <input type="date" name='eventDate' className='sign-input' />
                    <label htmlFor="eventDesc" className='m-2 text-xl font-nunito'>Description</label>
                    <textarea name="eventDesc" className='sign-input' rows={10}></textarea>
                    <button type='submit' className='sign-btn'>Add +</button>
                </form>
            </Modal>
        </>
    )
}
