"use client"
import React, {useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import useSWR from "swr";
import { fetcher } from "../../libs";

export default function PostCreate() {
  const router = useRouter()
  const [title, setTitle] =useState<string>('');
  const [body, setBody] = useState<string>('');
  const [medium, setMedium] =useState<string>('TV');
  const [rating, setRating] = useState<string>('');
  const [status, setStatus] = useState<string>('Completed');

  const [id,setId] = useState(0);

  const { data: session, update } = useSession()
  const url = '/api/user/getId?' +  new URLSearchParams({"UserEmail": `${session?.user?.email}`})

  let { data, error, isLoading } =  useSWR(url, fetcher)
    useEffect(()=>{
      if(data && data.result?.data)
      {
        //console.log(data.result.data);
        setId(data.result.data.id);
        console.log()
      }
    },[data,isLoading]);



  const addPost = async (e: any) => {
    e.preventDefault()
    if (title!="" && body!="") {
      const formData = {
          title: title,
          content: body,
          medium: medium,
          rating: rating,
          status: status,
          user_id: id,

      }
      const add = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(add.ok)
      {
        router.push(`/post/${id}`);
      }

    }
  };
  return (
    <form className='w-full' onSubmit={addPost}>
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
                <option value="Completed">Completed</option>
                <option value="Watching">Watching</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Dropped">Dropped</option>
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