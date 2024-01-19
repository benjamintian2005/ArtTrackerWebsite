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
        <ul>
            {searchs && searchs.map((item : any)=> <li><Link key = {item.id} href ={`/profile/${item.id}`}> {item.name} </Link></li>)}
        </ul>
  
        </>
        )
}