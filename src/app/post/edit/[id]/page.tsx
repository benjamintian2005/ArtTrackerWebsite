"use client"
import React, {useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/app/libs'
import useSWR from 'swr'
import { editPost } from '@/app/lib/data'
export default function PostEdit({params} :{params:{id:number}}) {
  const router = useRouter()
  const {data : post,isLoading, error} = useSWR(`/api/posts/${params.id}`,fetcher)
  const [title, setTitle] =useState<string>('');
  const [body, setBody] = useState<string>('');
  const [medium, setMedium] =useState<string>('TV');
  const [status, setStatus] =useState<string>('Completed');
  const [rating, setRating] = useState<string>('');
  useEffect(()=>{
     if(post){
         setTitle(post.title)
         setBody(post.content)
         setMedium(post.medium)
         setStatus(post.status)
         setRating(post.rating)
     }
  },[post, isLoading])
  const updatePost = async (e: any) => {
    e.preventDefault()
    if (title!="" && body!="") {
      const formData = {
          title: title,
          content: body,
          medium: medium,
          rating: rating,
          status: status,
      }
      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(res.ok)
      {
        router.push(`/post/${post.user_id}`);
      }

    }
  };
  if(isLoading) return <div><span>Loading...</span></div>
  if (!post) return null;
  return (
      <form className='w-full' onSubmit={updatePost}>
        <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Add</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
             <input value={title} type='text' name='title' className='font-bold text-yellow-500 w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setTitle(e.target.value)}/>
        </div>
        <div className='w-full py-2'>
            <label htmlFor="" className='text-sm font-bold py-2 block'>Medium</label>
            <select 
                value = {medium}
                onChange ={e=> setMedium(e.target.value)} 
                className='text-black'>
                <option value="TV">TV</option>
                <option value="Movie">Movie</option>
                <option value="Albums">Albums</option>
                <option value="Books">Books</option>
            </select>        
         </div>
         <div className='w-full py-2'>
            <label htmlFor="" className='text-sm font-bold py-2 block'>Status</label>
            <select 
                value = {status}
                onChange ={e=> setStatus(e.target.value)} 
                className='text-black'>
                <option value="TV">Completed</option>
                <option value="Movie">Watching</option>
                <option value="Albums">Plan to Watch</option>
                <option value="Books">Dropped</option>
            </select>        
         </div>
        <div className='w-full py-2'>
        <form>
            <label>Enter Rating </label>
            <input
            className='text-black'
            type="number" 
            value={rating}
            onChange={(e:any)=>setRating(e.target.value)} 
            />
         </form>
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Content</label>
             <textarea name='title' className='font-bold text-yellow-500 w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e:any)=>setBody(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
  )
}