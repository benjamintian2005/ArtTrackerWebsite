"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import {useState,useEffect } from 'react'
import { Dropdown } from "flowbite-react";


export default function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] =useState("original search query");
  const [searchCategory, setSearchCategory] = useState("Users")
  const handleSearchQuery = (e:any) => {
    //console.log("changed search Querry")
    //console.log(searchQuery)
    setSearchQuery(e.target.value);
  }
  const search = () => {
    //console.log(`push to search ${searchQuery}`)
    const url = `/search/${searchQuery}`
    const encode = encodeURI(url)
    router.push(encode)
  }
  return (
        
    <div>
        <div className="flex">
            <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
        <Dropdown label="Dropdown button">
            <Dropdown.Item onClick = {() => setSearchCategory("Users")}>
                Users
            </Dropdown.Item>
            <Dropdown.Item onClick = {() => setSearchCategory("Posts")}>
                Posts
            </Dropdown.Item>
        </Dropdown>
            <div className="relative w-full">
                <input type="search" value = {searchQuery} onChange = {handleSearchQuery} id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required/>
                <button onClick= {search} className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    </div>

  )
}