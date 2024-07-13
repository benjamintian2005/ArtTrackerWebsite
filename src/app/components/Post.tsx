import React,{useEffect, useState} from "react";
import { PostModel } from '../types'
import Link from 'next/link'
import useSWR from "swr";
import { fetcher } from "../libs";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { deletePost } from "../lib/data";

export default function Post(params: PostModel) {
  const router = useRouter()
  let icon = <div className="flex flex-row items-start justify-start gap-[20px]"></div>
  if(params.onSelf)
  {
   icon = 
   <div className="flex flex-row items-start justify-start gap-[20px]">
    <img
      className="h-7 w-7 relative rounded-[1000px] overflow-hidden shrink-0 object-cover min-h-[28px]"
      loading="lazy"
      alt=""
      src="/trash.png"
      onClick={()=>params.deletePost(params.id)}
    />

    <Image
      className="h-7 w-7 relative object-cover min-h-[28px]"
      loading="lazy"
      alt="image not showing up"
      src={"/edit.png"}
      onClick={()=>router.push(`/post/edit/${params.id}`)}
      width={7}
      height={7}
    />
  </div>
  }
  
  return (
    <div
    className="self-stretch box-border flex flex-row flex-wrap items-start justify-start pt-3 px-0 pb-3.5 gap-[20px] max-w-full border-t-[1px] border-solid border-gainsboro-100"
    
  >
    <div
      className="flex-1 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[339px] max-w-full mq750:min-w-full"
      onClick={()=>router.push(`/post/read/${params.id}`)}
    >
      <div
        className="self-stretch relative leading-[150%] font-medium overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {params.title}
      </div>
    </div>
    <div
      className="w-[244px] flex flex-row items-start justify-between py-0 pr-14 pl-0 box-border gap-[20px] text-[12px]"
    >
      <div
        className="w-[66px] rounded-lg bg-white box-border flex flex-row items-start justify-start py-1 px-[7px] whitespace-nowrap border-[1px] border-solid border-gainsboro-100"
      >
        <div
          className="relative leading-[16px] font-semibold inline-block min-w-[50px]"
        >
          {params.rating}
        </div>
      </div>
      <div
        className="w-12 flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border text-right text-base text-gray-100"
      >
        <div className="self-stretch relative leading-[150%]">{params.created_at}</div>
      </div>
    </div>
    <div className="h-6 w-9 relative hidden"></div>
    {icon}
  </div>
  )
}