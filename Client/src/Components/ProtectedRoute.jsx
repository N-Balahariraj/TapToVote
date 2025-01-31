// Libraries
import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// Firebase
import { useAuth } from '../Firebase/Utils/AuthContext.jsx'

// External Components
import PacmanLoader from 'react-spinners/PacmanLoader'
import { Modal } from 'react-bootstrap'

export default function ProtectedRoute({ children }) {
    const location = useLocation()
    const { user, userDetails, loading } = useAuth()
    const [showModal, setShowModal] = useState(true)
    if (loading) {
        return <PacmanLoader size={40} color='#c860f1' className=' self-center mx-auto' />
    }
    if (!user) {
        return <Navigate to={'/SignIn'} state={{ from: location }} replace />
    }
    if (userDetails.role === 'user' && !user.emailVerified) {
        return (
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Email Verification
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Verify your email to continue accessing this page
                    </p>
                </Modal.Body>
            </Modal>
        )
    }
    return children
}
