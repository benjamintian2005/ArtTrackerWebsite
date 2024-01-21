import React, {useEffect, useState} from 'react'
import { PostModel } from '../types'
import Link from 'next/link'
import useSWR from "swr";
import { fetcher } from "../libs";

export default function FollowedPost(params: PostModel) {

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
    <tr>
            <td className='border border-slate-300'>{params.title}</td>
            <td className='border border-slate-300 text-center'>{name}</td>
            <td className='border border-slate-300 text-center'>{params.medium}</td>
            <td className='border border-slate-300 text-center'>{params.status}</td>
            <td className='border border-slate-300 text-center'>{params.rating}</td>
            <td className='w-52 border border-slate-300'>
              <Link href={`/post/read/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>View</Link>
            </td>
    </tr>
  )
}