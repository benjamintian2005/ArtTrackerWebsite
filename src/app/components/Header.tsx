import React from 'react'
import UserButton from "./user-button"
import NavBar from "./NavBar"

export default function Header() {
  return (
    <div className='sticky top-0 z-10'>
      <div className='bg-gray-300'>
        <div
          className="absolute top-[0px] left-[0px] bg-black"
        >Logger</div>
        <div className='text-right'>        
          <UserButton/>
        </div>

      </div>
      <NavBar/>


    </div>
  )
}