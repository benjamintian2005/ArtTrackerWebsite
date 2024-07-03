"use client"
import React from 'react'
import Link from "next/link";
import UserButton from "./user-button"
import SearchBar from "./ui/searchbar"
import { useSession } from "next-auth/react"
import useSWR from "swr";
import {useEffect, useState} from "react";
import { fetcher } from "../libs";
import { useRouter } from 'next/navigation'



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

    const router = useRouter()
    const [searchQuery, setSearchQuery] =useState("");
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
      <header
      className="self-stretch bg-darkgreen flex flex-row items-end justify-between pt-[13px] pb-[15px] pr-[27px] pl-[18px] box-border max-w-full gap-[20px] text-left text-9xl text-silver font-small-text"
    >
      <div
        className="h-[68px] w-[1065px] relative bg-darkgreen hidden max-w-full"
      ></div>
      <div className="flex flex-col items-start justify-end pt-0 px-0 pb-1">
        <div
          className="flex flex-row items-start justify-start gap-[32px] mq1100:hidden"
        >
          <Link href={`/`}>
            <h2
              className="m-0 relative text-inherit tracking-[-0.02em] leading-[31px] font-semibold font-inherit inline-block min-w-[78px] z-[1]"
            >
              Home
            </h2>
          </Link>
          <Link href={`/profile/${id}`}>

          <h2
            className="m-0 relative text-inherit tracking-[-0.02em] leading-[31px] font-semibold font-inherit text-gray-300 inline-block min-w-[84px] z-[1]"
          >
            Profile
          </h2>
          </Link>
        </div>
      </div>
      <div
        className="w-[295px] rounded-lg bg-white box-border flex flex-row items-start justify-start py-1.5 px-3 gap-[12px] z-[1] text-base text-gray-100 border-[1px] border-solid border-gainsboro-100"
      >
        <img
          className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
          alt=""
          src="/search.svg"
        />

        <input
          className="flex-1 relative leading-[24px] overflow-hidden text-ellipsis whitespace-nowrap"
          type='search'
          value = {searchQuery}
          onChange={handleSearchQuery}
          onKeyDown={(e) => {
            if (e.key === "Enter")
                search();
            }}
        />
          
      </div>
    </header>
      );
}