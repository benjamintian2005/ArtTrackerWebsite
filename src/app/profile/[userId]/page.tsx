"use client"
import Link from "next/link";
import { useSession } from "next-auth/react"
import React,{useEffect, useState} from "react";
import { fetcher } from "../../libs";
import FollowedPost from "../../components/FollowedPost";
import { PostModel } from "../../types";
import useSWR from "swr";

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


    if (!session?.user || !session?.user?.email) return <h1>Not Loggin In Yet </h1>
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

    const url3 = '/api/user?' +  new URLSearchParams({"userId": `${params.userId}`})
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
          setFollow("follow successful")
        }
      }
  
      
    };

    


    return (
      <div className="p-16">
      <div className="p-8 bg-white shadow mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">{followingCount}</p>
              <p className="text-gray-400">Following</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">{followerCount}</p>
              <p className="text-gray-400">Followers</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">{posts.length}</p>
              <p className="text-gray-400">Posts</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg xmlns={image}className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
      
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
      <button
        onClick ={follow_account} className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
      >
        {follow}
      </button>
          </div>
        </div>
      
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{name}</h1>
        </div>
      
        <div className="mt-12 flex flex-col justify-center">
          
          <Link href = {`/post/${params.userId}`}
        className="text-indigo-500 py-2 px-4  font-medium mt-4"
      >
        Show Log
      </Link>
        </div>
      
      </div>
      </div>
    )
  }