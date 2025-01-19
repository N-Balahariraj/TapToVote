import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { useAuth } from '../Firebase/Utils/AuthContext.jsx'
import PacmanLoader from 'react-spinners/PacmanLoader'

export default function ProtectedRoute({children}) {
    const location = useLocation()
    const {user,loading} = useAuth()
    if(loading){
        return <PacmanLoader size={40} color='#c860f1' className=' self-center mx-auto'/>
    }
    if(!user){
        return <Navigate to={'/SignIn'} state={{from: location}} replace/>
    }
    return children
}
