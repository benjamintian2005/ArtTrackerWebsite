"use client"
import React from 'react'
import Link from "next/link";
import UserButton from "./user-button"
import SearchBar from "./ui/searchbar"
import { useSession } from "next-auth/react"
import useSWR from "swr";
import {useEffect, useState} from "react";
import { fetcher } from "../libs";


export default function NavBar() {
  const [id,setId] = useState(0);

    const { data: session, update } = useSession()
    const url = '/api/user/getId?' +  new URLSearchParams({"UserEmail": `${session?.user?.email}`})
    let { data, error, isLoading } =  useSWR(url, fetcher)
    useEffect(()=>{
      if(data && data.result?.data)
      {
        //console.log(data.result.data);
        setId(data.result.data.id);
      }
    },[data,isLoading]);

    return (
        <>
          <div className="w-full h-20 bg-emerald-800 sticky top-0">
            <div className="container mx-auto px-4 h-full">
              <div className="flex justify-between items-center h-full">
                <ul className="hidden md:flex gap-x-6 text-white ">
                  <li>
                    <Link href="/">
                      <p>Home</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/profile/${id}`}>
                      <p>Profile</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/post/${id}`}>
                      <p>All Logs</p>
                    </Link>
                  </li>
                  <li className='float-right'>
                    <SearchBar/>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </>
      );
}