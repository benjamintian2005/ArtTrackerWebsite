import React, {useEffect, useState} from 'react'
import { PostModel } from '../types'
import Link from 'next/link'
import useSWR from "swr";
import { fetcher } from "../libs";
import { useRouter } from 'next/navigation';
export default function FollowedPost(params: PostModel) {
  const router = useRouter()
  const [name,setName] = useState("")
    const url3 = '/api/user?' +  new URLSearchParams({"User_id": `${params.user_id}`})
  //console.log(url)
  const {"data": userData}=  useSWR(url3, fetcher)
  //console.log(userData)
  useEffect(()=>{
  if(userData && userData.result?.data)
  {
    //console.log(userData.result.data);
    setName(userData.result.data.name);
  }
  },[userData]);
  return (
    <div
        className="shadow-[-4px_8px_20px_rgba(0,_0,_0,_0.1)] rounded-xl bg-white box-border w-[405.3px] p-8 border-[1px] border-solid border-whitesmoke-100 mx-auto my-8"
        onClick={()=>router.push(`/post/read/${params.id}`)}
      >
        <div className="self-stretch relative leading-[150%] font-medium text-black">
          {params.title} is a {params.rating}
        </div>
        <div
          className="flex flex-row items-center justify-start gap-[16px] text-base"
        >
          <img
            className="w-[45px] relative rounded-[50%] h-[45px] object-cover"
            alt=""
            src="/public/avatar@2x.png"
          />

          <div className="flex flex-col items-start justify-start gap-[2px]">
            <div className="relative leading-[150%] font-medium text-black">{name}</div>
            
          </div>
        </div>
      </div>
  )
}