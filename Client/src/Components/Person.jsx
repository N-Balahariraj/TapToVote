import React from 'react'

export default function Person({id,name,profilePic,mail}) {
  return (
    <div className='h-[15%] w-[90%] flex gap-2 border-b-2 p-2 cursor-pointer'>
      {profilePic ?
        <img src={profilePic} alt="profile" className='h-[100%] border-2 rounded-full' />:
        <span className='w-[30%] border-2 rounded-full flex justify-center items-center text-3xl font-extrabold bg-slate-300'>{name.charAt(0)}</span>
      }
      <div className='h-[100%] w-[60%] flex flex-col justify-center'>
        <span className='font-semibold'>{name}</span>
        <span className='text-[#4f46e5]'>{mail}</span>
      </div>
    </div>
  )
}
