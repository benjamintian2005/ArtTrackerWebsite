'use client'
import useSWR from "swr";
import { fetcher } from "../../libs";
import React,{useEffect, useState} from "react";
import Link from "next/link";


export default function Search({params}: {params:{searchQuery: string}}){
    const searchQuery = decodeURI(params.searchQuery)
    const [searchs, setSearchs] = useState([])
    const url = '/api/user/search?' +  new URLSearchParams({"searchQuery": searchQuery})
    //console.log(url)
    let { data, error, isLoading } =  useSWR(url, fetcher)
    useEffect(()=>{
      if(data && data.result.data)
      {
        console.log("This is the Searches")
        console.log(data.result.data);
        setSearchs(data.result.data);
      }
    },[data,isLoading]);
    if(searchs.length==0) return <h1> no seraches found </h1>

    return (
        <>        
        <h1> All Searches </h1>
            {searchs && searchs.map((item : any)=> 
            <div
            className="w-[705px] box-border flex flex-row mx-auto items-center justify-start pt-2.5 px-[7px] pb-[9px] gap-[28px] max-w-full border-[1px] border-solid border-black mq450:flex-wrap"
          >
            <div
              className="h-[75px] w-[705px] relative box-border hidden max-w-full border-[1px] border-solid border-black"
            ></div>
            <div
              className="h-[52.8px] w-[50px] relative rounded-[48px] overflow-hidden shrink-0 bg-[url('/public/graphic@3x.png')] bg-cover bg-no-repeat bg-[top] z-[1]"
            >
              <div
                className="absolute top-[35.9px] left-[4px] w-[100px] h-[100px] overflow-hidden hidden"
              ></div>
            </div>
            <Link
              className="w-[94px] [border:none] [outline:none] bg-[transparent] h-9 flex flex-col items-start justify-start pt-3 px-0 pb-0 box-border font-presets-body2 font-medium text-base text-black"
              key = {item.id} href ={`/profile/${item.id}`}
            >
               {item.name}
            </Link>
          </div>)}
  
        </>
        )
}
