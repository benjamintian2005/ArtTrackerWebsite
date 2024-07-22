'use client'
import { fetcher } from '@/app/libs';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"

export default function Detail({params}: {params:{id :number}}) {
  const { data: session, update } = useSession()

  const {data: post}  = useSWR(`/api/posts/${params.id}`,fetcher);
  const [comment, setComment] = useState<string>('');
  const addPost = async (e: any) => {
    e.preventDefault()
    if (comment!="") {
      const formData = {
          comment: comment,
          user_id: "id",

      }
      const add = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

    }
  };
  if (!post) return null;
  
  
  return (
    <>
    <section
        className="w-[1065px] flex flex-row items-start justify-center pt-0 px-0 pb-[7px] box-border max-w-full text-center text-sm text-black font-small-text mx-auto"
      >
        <div
          className="w-[705px] bg-gainsboro-300 box-border flex flex-col items-start justify-start pt-[29px] px-[79px] pb-[75px] gap-[7px] max-w-full border-[1px] border-solid border-black mq675:pt-5 mq675:pb-[49px] mq675:box-border mq750:pl-[39px] mq750:pr-[39px] mq750:box-border"
        >
          <div
            className="w-[705px] h-[523px] relative bg-gainsboro-300 box-border hidden max-w-full border-[1px] border-solid border-black"
          ></div>
          <div
            className="flex flex-row items-start justify-start gap-[79px] max-w-full mq450:gap-[20px] mq675:flex-wrap mq675:gap-[39px]"
          >
            <div
              className="w-[100px] flex flex-col items-start justify-start pt-[3px] px-0 pb-0 box-border"
            >
              <div
                className="self-stretch flex flex-col items-start justify-start gap-[8px]"
              >
                <div
                  className="w-[100px] h-[100px] relative rounded-29xl overflow-hidden shrink-0 bg-[url('/public/graphic@3x.png')] bg-cover bg-no-repeat bg-[top] z-[1]"
                >
                  <div
                    className="absolute top-[35.9px] left-[4px] w-full h-full overflow-hidden hidden"
                  ></div>
                </div>
                <div
                  className="self-stretch relative leading-[20px] font-medium overflow-hidden text-ellipsis whitespace-nowrap z-[1]"
                >
                  {post.user_id}
                </div>
              </div>
            </div>
            <div
              className="relative text-[45px] leading-[140%] font-medium inline-block max-w-full z-[1] mq450:text-[30px] mq450:leading-[42px] mq750:text-[40px] mq750:leading-[56px]"
            >
              rated {post.title} a {post.rating}
            </div>
          </div>
          <div
            className="self-stretch flex flex-row items-start justify-start py-0 pr-2.5 pl-4 box-border max-w-full"
          >
            <textarea
              className="[border:none] bg-darkgray h-[277px] w-auto [outline:none] flex-1 flex flex-row items-start justify-start py-[21px] px-[22px] box-border font-small-text font-medium text-sm text-black max-w-full z-[1]"
              
            >
              {post.content}
            </textarea>
          </div>
        </div>
      </section>
      <section
        className="w-[1065px] flex flex-row items-start justify-center max-w-full text-center text-sm text-black font-small-text mx-auto"
      >
        <div
          className="w-[705px] flex flex-col items-end justify-start gap-[16px] max-w-full"
        >
          <div
            className="self-stretch flex flex-row items-start justify-end py-0 pr-px pl-0 box-border max-w-full"
          >
            <img
              className="flex-1 relative max-w-full overflow-hidden max-h-full object-contain mt-[-1px]"
              loading="lazy"
              alt=""
              src=""
            />
          </div>
          <div
            className="self-stretch flex flex-row items-start justify-end py-0 pr-0.5 pl-1 box-border max-w-full mx-auto"
          >
            <div
              className="flex-1 flex flex-row items-end justify-between max-w-full gap-[20px] mq450:flex-wrap"
            >
             
                <div
                  className="h-20 w-[79.4px] relative rounded-29xl overflow-hidden shrink-0 bg-[url('/public/graphic1@3x.png')] bg-cover bg-no-repeat bg-[top]"
                >
                  <div
                    className="absolute top-[35.9px] left-[4px] w-[100px] h-[100px] overflow-hidden hidden"
                  ></div>
                </div>
                
                  <input
                    className="relative font-medium inline-block"
                    placeholder='add comment'
                    onChange={(e:any)=>setComment(e.target.value)}
                  />
                
              
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-4">
                <button
                  className="cursor-pointer [border:none] py-2 px-[15px] bg-black rounded-lg flex flex-row items-start justify-start shrink-0 hover:bg-darkslategray-100"
                >
                  <div
                    className="relative text-base leading-[150%] font-medium font-small-text text-white text-left inline-block min-w-[75px]"
                    onClick = {()=>alert("sdf")}
                  >
                    Comment
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div
            className="self-stretch h-px relative box-border border-t-[1px] border-solid border-black"
          ></div>
        </div>
      </section>
      </>
  )
}
