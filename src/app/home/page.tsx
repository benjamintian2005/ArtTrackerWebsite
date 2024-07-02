"use client";
import React,{useEffect, useState} from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import FollowedPost from "../components/FollowedPost";
import { PostModel } from "../types";
import Link from "next/link";
import { auth } from "../../../auth"
import { useSession } from "next-auth/react"




export default function FollowedPosts() {
  const { data: session, update } = useSession()
  console.log(session?.user)
  const [name, setName] = useState(session?.user?.name ?? "")
  if (!session?.user || !session?.user?.email) return <h1>Not Loggin In Yet </h1>
  const [posts,setPosts] = useState<PostModel[]>([]);
  const [sessionId, setSessionId] = useState("")
  const url4 = '/api/user/getId?' +  new URLSearchParams({"UserEmail": `${session?.user?.email}`})
    const sessionIdRawData =  useSWR(url4, fetcher)
    console.log(sessionIdRawData)
    useEffect(()=>{
      if(sessionIdRawData.data && sessionIdRawData.data.result?.data)
      {
        console.log("This is the user")
        console.log(sessionIdRawData.data.result.data);
        setSessionId(sessionIdRawData.data.result.data.id);
      }
    },[sessionIdRawData]);

  const url = '/api/content?' +  new URLSearchParams({"userId": sessionId})
  //console.log(url)
  const { data, error, isLoading } = useSWR(url, fetcher)
  useEffect(()=>{
    if(data && data.result.data)
    {
      console.log(data.result.data);
      setPosts(data.result.data);
    }
  },[data,isLoading]);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
  return (
    <div className="h-screen overscroll-contain">
      {
        posts && posts.map((item : PostModel)=><FollowedPost key={item.id} {...item}/>)
      }
    </div>
  );
}