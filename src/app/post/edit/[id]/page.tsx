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
        router.push(`/profile/${post.user_id}`);
      }

    }
  };
  if(isLoading) return <div><span>Loading...</span></div>
  if (!post) return null;
  return (
    <section
    className="mx-auto w-[1065px] flex flex-col items-start justify-start gap-[51px] max-w-full text-left text-base text-black font-single-line-body-base mq525:gap-[25px]"
  >
    
    <div
      className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full"
    >
      <div
        className="w-[705px] bg-gainsboro-300 box-border flex flex-col items-center justify-start pt-[52px] px-5 pb-[103px] gap-[26.9px] max-w-full border-[1px] border-solid border-black mq525:pt-[34px] mq525:pb-[67px] mq525:box-border"
      >
        <div
          className="w-[705px] h-[558px] relative bg-gainsboro-300 box-border hidden max-w-full border-[1px] border-solid border-black"
        ></div>
        <div
          className="w-[521px] flex flex-row items-end justify-between gap-[20px] max-w-full mq525:flex-wrap"
        >
          <div
            className="w-[165px] flex flex-col items-start justify-start gap-[9.8px]"
          >
            <div className="flex flex-row items-start justify-start py-0 px-4">
              <div
                className="relative leading-[150%] font-medium inline-block min-w-[45px] shrink-0 z-[1]"
              >
                rating
              </div>
            </div>
            <div
              className="self-stretch h-[47.2px] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-lg bg-white box-border flex flex-row items-start justify-start py-3 px-4 relative shrink-0 z-[2] border-[1px] border-solid border-gainsboro-100"
            >
              <input
                className="w-[263px] [border:none] [outline:none] font-medium font-single-line-body-base text-base bg-[transparent] h-6 absolute !m-[0] right-[-114px] bottom-[11.2px] leading-[150%] text-gray-100 text-left inline-block p-0"
                type="number" 
                value={rating}
                onChange={(e:any)=>setRating(e.target.value)}
              />
            </div>
          </div>
          <div
            className="w-[161px] flex flex-col items-start justify-start gap-[4.9px]"
          >
            <div className="flex flex-row items-start justify-start py-0 px-4">
              <div
                className="relative leading-[150%] font-medium inline-block min-w-[30px] z-[1]"
              >
                title
              </div>
            </div>
            <div
              className="self-stretch h-12 shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-lg bg-white box-border flex flex-row items-start justify-start py-3 px-4 relative z-[1] border-[1px] border-solid border-gainsboro-100"
            >
              <input
                className="w-[263px] [border:none] [outline:none] font-medium font-single-line-body-base text-base bg-[transparent] h-6 absolute !m-[0] top-[calc(50%_-_12px)] right-[-118px] leading-[150%] text-gray-100 text-left inline-block p-0"
                type="text"
                onChange={(e:any)=>setTitle(e.target.value)}
                value ={title}
              />
            </div>
          </div>
        </div>
        <div
          className="w-[525px] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.05)] rounded-lg bg-white box-border flex flex-col items-start justify-start pt-2.5 pb-[0.2px] pr-0 pl-3.5 gap-[214.7px] max-w-full z-[2] text-gray-100 border-[1px] border-solid border-gainsboro-100 mq450:gap-[54px] mq525:gap-[107px]"
        >
          <input
            className="w-[493px] relative leading-[150%] font-medium inline-block max-w-full"
            onChange={(e:any)=>setBody(e.target.value)}
            value = {body}
          />
            
         
          <div className="self-stretch flex flex-row items-start justify-end">
            <button
              className="cursor-pointer py-2.5 px-[11px] bg-background-brand-default w-[75px] rounded-radius-200 box-border overflow-hidden shrink-0 flex flex-row items-start justify-start gap-[8px] z-[3] border-[1px] border-solid border-background-brand-default"
            >
              <img
                className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                alt=""
                src="/public/star.svg"
              />

              <div
                className="relative text-base leading-[100%] font-single-line-body-base text-text-brand-on-brand text-left inline-block min-w-[51px]"
                onClick={updatePost}
              >
                Submit
              </div>
              <img
                className="h-4 w-4 relative overflow-hidden shrink-0 hidden min-h-[16px]"
                alt=""
                src="/public/x.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}