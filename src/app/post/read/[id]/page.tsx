'use client'
import { fetcher } from '@/app/libs';
import useSWR from 'swr';

export default function Detail({params}: {params:{id :number}}) {
  const {data: post, isLoading, error}  = useSWR(`/api/posts/${params.id}`,fetcher);
  if(isLoading) return <div><span>Loading...</span></div>
  if (!post) return null;
  return (
    <div className='w-full'>
       <h2 className='text-center font-bold text-3xl py-3'>{post.title}</h2>

       <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
         <p dangerouslySetInnerHTML={{ __html: post.content}}></p>

        <h3>Medium {post.medium}</h3>
        <h3>Status {post.status}</h3>
        <h3>Rating {post.rating}</h3>
       </div>


    </div>
  )
}
