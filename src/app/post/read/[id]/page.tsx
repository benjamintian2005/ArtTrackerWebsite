'use client'
import { fetcher } from '@/app/libs';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
export default function Detail({params}: {params:{id :number}}) {
  const {data: post, isLoading, error}  = useSWR(`/api/posts/${params.id}`,fetcher);
  if(isLoading) return <div><span>Loading...</span></div>
  if (!post) return null;
  
  
  return (
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
  )
}
