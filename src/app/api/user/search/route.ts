

import { NextRequest, NextResponse } from 'next/server'
import { searchUsers} from '@/app/lib/data';


export async function GET(request : NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("searchQuery")

  if(searchQuery == null) return  NextResponse.json([])

  
  const users = await searchUsers(searchQuery);
  const result =  {
    result: {
      data: users
    }
  }
  return NextResponse.json(result);
}
