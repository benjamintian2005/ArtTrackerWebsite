import React from 'react'
import { PostModel } from '../types'
import Link from 'next/link'
export default function FollowedPost(params: PostModel) {
  
  return (
    <tr>
            <td className='border border-slate-300'>{params.title}</td>
            <td className='border border-slate-300 text-center'>{params.created_at}</td>
            <td className='border border-slate-300 text-center'>{params.medium}</td>
            <td className='border border-slate-300 text-center'>{params.status}</td>
            <td className='border border-slate-300 text-center'>{params.rating}</td>
            <td className='w-52 border border-slate-300'>
              <Link href={`/post/read/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>View</Link>
            </td>
    </tr>
  )
}