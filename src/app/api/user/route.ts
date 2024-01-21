

import { NextRequest, NextResponse } from 'next/server'
import { searchUser} from '@/app/lib/data';


export async function GET(request : NextRequest) {
    const userIdString = request.nextUrl.searchParams.get("User_id")
  
    if(userIdString == null) return  NextResponse.json([])
  
    const userId: number = +userIdString
    const user = await searchUser(userId);
    console.log(user)
    const result =  {
      result: {
        data: user
      }
    }
    return NextResponse.json(result);
}