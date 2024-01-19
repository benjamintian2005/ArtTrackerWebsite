

import { NextRequest, NextResponse } from 'next/server'
import { fetchPosts, insertPost} from '@/app/lib/data';


export async function GET(request : NextRequest) {
  const userId = request.nextUrl.searchParams.get("User_id")
  if(userId == null) return  NextResponse.json([])
  const user_id: number = +userId

  const latestInvoices = await fetchPosts(user_id);
  const result =  {
    result: {
      data: latestInvoices
    }
  }
  return NextResponse.json(result);
}
export async function POST(request: NextRequest) {
  const body = await request.json()
  const post = await insertPost(body);


  return NextResponse.json(post)

}