import React from 'react'
import { useMediaQuery } from "react-responsive";
import { useNavigate, Link } from 'react-router-dom';
import { SignUp } from '../Firebase/Utils/users.utils.js';
import {toast,ToastContainer} from 'react-toastify'

export default function Signup() {
  const isMobile = useMediaQuery({ minWidth: '320px', maxWidth: '1075px' })
  const navigate = useNavigate();

  return (
    <>
    <ToastContainer/>
    <div className='SignBox'>
        <img src="/SignUp.png" alt="Sign Up" className={`${isMobile?'hidden':'w-[50%]'}`}/>
        <form  
            className={`${isMobile?'w-[100%]':'w-[50%]'} h-[100%] flex flex-col p-2 font-nunito`}
            onSubmit={async (e)=>{
                e.preventDefault();
                const name = e.target.elements.name.value
                const email = e.target.elements.email.value
                const pass = e.target.elements.pass.value
                const confPass = e.target.elements.confPass.value
                const role = 'user'
                // console.log({name,email,pass,confPass})
                if(pass !== confPass){
                    toast('Check you password',{type:'error'})
                    return
                }
                try {
                    const user = await SignUp(name,email,pass,role)
                    if(!user){
                        toast('User not registered. Try again later!',{type:'error'})
                        return
                    }
                } catch (error) {
                    toast(error.message,{type:'error'})
                    return
                }
                toast('User registered successfully',{type:'success'})
                navigate('/Home')
            }}
        >
            <span className='sign-header'>Register</span>
            <label className='sign-label' htmlFor="name">User name</label>
            <input className='sign-input' type="text" name='name'/>
            <label className='sign-label' htmlFor="email">Email ID</label>
            <input className='sign-input' type="mail" name='email'/>
            <label className='sign-label' htmlFor="pass">Password</label>
            <input className='sign-input' type="password" name='pass'/>
            <label className='sign-label' htmlFor="confPass">Confirm Password</label>
            <input className='sign-input' type="password" name='confPass'/>
            <button className='sign-btn' type='submit'>Sign Up</button>
            <span className='m-2'>Already have an account? <Link to={'/SignIn'} className='text-[#4f46e5] underline'>SignIn</Link></span>
        </form>
    </div>
    </>
  )
}
