import React,{useEffect, useState} from "react";
import { PostModel } from '../types'
import Link from 'next/link'
import useSWR from "swr";
import { fetcher } from "../libs";

export default function Post(params: PostModel) {
  
  
  return (
    <tr>
            <td className='border border-slate-300 text-white'>{params.title}</td>
            <td className='border border-slate-300 text-white text-center'>{params.created_at}</td>
            <td className='border border-slate-300 text-center'>{params.medium}</td>
            <td className='border border-slate-300 text-center'>{params.status}</td>
            <td className='border border-slate-300 text-center'>{params.rating}</td>
            <td className='w-52 border border-slate-300'>
              <button onClick={()=>params.deletePost(params.id)} className='bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded'>Delete</button>
              <Link href={`/post/edit/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-black text-sm'>Edit</Link>
              <Link href={`/post/read/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-black text-sm'>View</Link>
            </td>
    </tr>
  )
}