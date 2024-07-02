"use client"
import Link from "next/link";
import { useSession } from "next-auth/react"
import React,{useEffect, useState} from "react";
import { fetcher } from "../../libs";
import FollowedPost from "../../components/FollowedPost";
import { PostModel } from "../../types";
import Posts from "@/app/post/[id]/page";
import useSWR from "swr";
import Post from "../../components/Post";

export default function Profile({params} :{params:{userId:number}}) {
    const { data: session, update } = useSession()
    //console.log(session?.user)
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [follow, setFollow] = useState("Follow this person")
    const [sessionId, setSessionId] = useState(0)

    //console.log("this is the user id")
    //console.log(session?.user?.id)
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)


    //if (!session?.user || !session?.user?.email) return <h1>Not Loggin In Yet </h1>
    const [posts,setPosts] = useState<PostModel[]>([]);
    const url = '/api/posts?' +  new URLSearchParams({"User_id": `${params.userId}`})
    //console.log(url)
    let { data, error, isLoading } =  useSWR(url, fetcher)
    useEffect(()=>{
      if(data && data.result?.data)
      {
        //console.log(data.result.data);
        setPosts(data.result.data);
      }
    },[data,isLoading]);
    const url1 = '/api/user/followers?' +  new URLSearchParams({"userId":  `${params.userId}`})
    const followersRawData =  useSWR(url1, fetcher)
    useEffect(()=>{
      if(followersRawData.data && followersRawData.data.result.data)
      {
        //console.log(followersRawData.data.result.data);
        setFollowerCount(followersRawData.data.result.data.length);
      }
    },[followersRawData]);

    const url2 = '/api/user/followed?' +  new URLSearchParams({"userId":  `${params.userId}`})
    const followedRawData =  useSWR(url2, fetcher)
    useEffect(()=>{
      if(followedRawData.data && followedRawData.data.result.data)
      {
        //console.log("this is the people user id is following")
        //console.log(followedRawData.data.result.data);
        setFollowingCount(followedRawData.data.result.data.length);
      }
    },[followedRawData]);

    const url3 = '/api/user?' +  new URLSearchParams({"User_id": `${params.userId}`})
    //console.log(url)
    const {"data": userData}=  useSWR(url3, fetcher)
    //console.log(userData)
    useEffect(()=>{
      if(userData && userData.result?.data)
      {
        //console.log(userData.result.data);
        setName(userData.result.data.name);
      }
    },[userData,isLoading]);

    const url4 = '/api/user/getId?' +  new URLSearchParams({"UserEmail": `${session?.user?.email}`})
    const sessionIdRawData =  useSWR(url4, fetcher)
    //console.log(sessionIdRawData)
    useEffect(()=>{
      if(sessionIdRawData.data && sessionIdRawData.data.result?.data)
      {
        //console.log("This is the user")
        //console.log(sessionIdRawData.data.result.data);
        setSessionId(sessionIdRawData.data.result.data.id);
        if(params.userId == sessionId){
          setFollow("This is your account")
        }
        else{
          setFollow("Follow this account")
        }
      }
    },[sessionIdRawData]);

    const follow_account = async (e: any) => {
      e.preventDefault()
      if(follow == "Follow this account"){
        const formData = {
            Following_user_id: sessionId,
            Followed_user_id: params.userId,
        }
        const add = await fetch('/api/setFollowing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if(add.ok)
        {
          alert("yo you just followed this dude")
          setFollow("follow successful") //fix this
        }
      }
  
      
    };
    let delete_Post : PostModel['deletePost']= async (id:number) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if(res.ok)
      {
        setPosts(posts?.filter((post:PostModel)=>{  return post.id !== id  }));
      }
    }
    let renderedPosts = posts && posts.map((item : PostModel)=><Post key={item.id} {...item} deletePost = {delete_Post} name = {name}/>);


    


    return (
      <div
      className="w-full relative bg-white overflow-hidden flex flex-col items-center justify-start pt-0 pb-[906px] pr-5 pl-[21px] box-border gap-[152px] leading-[normal] tracking-[normal] mq750:gap-[38px] mq450:gap-[19px] mq1100:gap-[76px]"
    >
      <section
        className="w-[1065px] flex flex-col items-end justify-start gap-[26px] max-w-full text-center text-[14px] text-white font-small-text"
      >
        <div
          className="self-stretch bg-gray-100 flex flex-row items-start justify-between pt-[54px] pb-[61px] pr-[107px] pl-12 box-border max-w-full gap-[20px] mq750:pr-[26px] mq750:box-border mq450:flex-wrap mq1100:pl-6 mq1100:pr-[53px] mq1100:box-border"
        >
          <div
            className="h-[182px] w-[1065px] relative bg-gray-100 hidden max-w-full"
          ></div>
          <div
            className="w-[110px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border"
          >
            <div
              className="self-stretch flex flex-col items-start justify-start gap-[18px]"
            >
              <div className="flex flex-col items-start justify-start">
                <div
                  className="relative leading-[20px] font-medium inline-block min-w-[95px] z-[1]"
                >
                  {name}
                </div>
                <div
                  className="relative text-3xs leading-[140%] font-medium inline-block min-w-[15px] z-[1]"
                >
                  bio
                </div>
              </div>
              <div
                className="relative text-3xs leading-[140%] font-medium inline-block min-w-[110px] z-[1]"
              >
                {followingCount} Following {followerCount} Followers
              </div>
            </div>
          </div>
          <button
            className="cursor-pointer [border:none] py-2 px-4 bg-whitesmoke rounded-lg flex flex-row items-start justify-start z-[1] hover:bg-lightgray"
          >
            <div
              className="relative text-base leading-[150%] font-medium font-small-text text-black text-left inline-block min-w-[49px]"
            >
              Follow
            </div>
          </button>
        </div>
        <div
          className="w-[1000px] flex flex-row items-start justify-end py-0 px-[59px] box-border max-w-full text-left text-base text-black mq1025:pl-[29px] mq1025:pr-[29px] mq1025:box-border"
        >
          <div
            className="flex-1 flex flex-col items-start justify-start gap-[16px] max-w-full"
          >
            <div
              className="w-[730px] flex flex-row flex-wrap items-start justify-start gap-[20px] max-w-full"
            >
              <div
                className="flex-1 relative leading-[150%] font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap min-w-[26px] max-w-full"
              >
                Title
              </div>
              <div
                className="w-[120px] relative leading-[150%] font-medium inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0"
              >
                Rating
              </div>
              <div
                className="w-12 relative leading-[150%] font-medium text-right inline-block overflow-hidden text-ellipsis whitespace-nowrap shrink-0"
              >
                Date
              </div>
              <Link href={`/post/create`} className="bg-green-500 p-2 inline-block text-white mr-16">Create</Link>

            </div>

            {renderedPosts}
          </div>
        </div>
      </section>
      
    </div>
    
        
      
    )
  }