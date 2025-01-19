import React from 'react';
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from 'react-router-dom';
import {SignIn} from '../Firebase/Utils/users.utils.js'
import { toast,ToastContainer } from 'react-toastify';

export default function Signin() {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  const navigate = useNavigate()

  return (
    <>
    <ToastContainer/>
    <div className='SignBox'>
        <form 
            className={`${isMobile?'w-[100%]':'w-[50%]'} self-center flex flex-col p-2 font-nunito`}
            onSubmit={async (e)=>{
                e.preventDefault();
                const email = e.target.elements.email.value
                const pass = e.target.elements.pass.value
                try {
                    const user = await SignIn(email,pass)
                    if(!user){
                        toast('User not registered. Try again later!',{type:'error'})
                        return
                    }
                } catch (error) {
                    toast(error.message,{type:'error'})
                    return
                }
                toast('User LoggedIn successfully',{type:'success'})
                navigate('/Home')
                }}
        >
            <span className='sign-header'>Log In</span>
            <label className='sign-label' htmlFor="email">Email ID</label>
            <input className='sign-input' type="mail" name='email'/>
            <label className='sign-label' htmlFor="pass">Password</label>
            <input className='sign-input' type="password" name='pass'/>
            <button className='sign-btn' type='submit'>Sign In</button>
            <span className='m-2'>Don't have an account? <Link to={'/'} className='text-[#4f46e5] underline'>SignUp</Link></span>
        </form>
        <img src="/SignIn.png" alt="Sign In" className={`${isMobile?'hidden':'w-[50%]'}`}/>
    </div>
    </>
  )
}
