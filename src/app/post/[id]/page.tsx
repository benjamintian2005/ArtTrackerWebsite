"use client";
import React,{useEffect, useState} from "react";
import useSWR from "swr";
import { fetcher } from "../../libs";
import Post from "../../components/Post";
import { PostModel } from "../../types";
import Link from "next/link";
import { auth } from "../../../../auth"
import { useSession } from "next-auth/react"
import FollowedPost from "@/app/components/FollowedPost";




export default function Posts({params} :{params:{id:number}}) {
  const { data: session, update } = useSession()
  //console.log(session?.user)
  
  //if (!session?.user || !session?.user?.email) return <h1>Not Loggin In Yet </h1>
  const [posts,setPosts] = useState<PostModel[]>([]);
  const [sessionId, setSessionId] = useState(0)

  const url4 = '/api/user/getId?' +  new URLSearchParams({"UserEmail": `${session?.user?.email}`})
    const sessionIdRawData =  useSWR(url4, fetcher)
    //console.log(sessionIdRawData)
    useEffect(()=>{
      if(sessionIdRawData.data && sessionIdRawData.data.result?.data)
      {
        setSessionId(sessionIdRawData.data.result.data.id); 
      }
    },[sessionIdRawData]);
  
  const userIdString = String(params.id)
  const { data, error, isLoading } = useSWR('/api/posts?' +  new URLSearchParams({"User_id": userIdString}), fetcher)
  useEffect(()=>{
    if(data && data.result?.data)
    {
      //console.log(data.result.data);
      setPosts(data.result.data);
    }
  },[data,isLoading]);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;
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
  
  let renderedPosts;
  if (sessionId == params.id) {
    renderedPosts = posts && posts.map((item : PostModel)=><Post key={item.id} {...item} deletePost = {delete_Post} />);
  } 
  else{
    renderedPosts = posts && posts.map((item : PostModel)=><FollowedPost key={item.id} {...item}/>);
  }
  return (
    <>
    <Link href={`/post/create`} className="bg-green-500 p-2 inline-block text-white mr-16">Create</Link>

    <div className="w-full max-w-7xl">

      <table className="w-full border-collapse border border-slate-400">
        <caption className="caption-top py-5 font-bold text-green-500 text-2xl">
          List Posts - Counter :
          <span className="text-red-500 font-bold">{ posts?.length}</span>
        </caption>
        <thead>
          <tr className="text-center">
            <th className="border border-slate-300">Title</th>
            <th className="border border-slate-300">Created at</th>
            <th className="border border-slate-300">Medium</th>
            <th className="border border-slate-300">Status</th>
            <th className="border border-slate-300">Rating</th>
            <th className="border border-slate-300">Modify</th>
          </tr>
        </thead>
        <tbody>
           {renderedPosts}
        </tbody>
      </table>
    </div>
    </>
  );
}