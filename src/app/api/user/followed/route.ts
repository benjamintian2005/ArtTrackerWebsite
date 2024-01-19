import { NextRequest, NextResponse } from 'next/server'
import { fetchFollowed, insertPost} from '@/app/lib/data';


export async function GET(request : NextRequest) {
  const userIdString = request.nextUrl.searchParams.get("userId")
  
  if(userIdString == null) return  NextResponse.json([])

  const userId: number = +userIdString
  const latestInvoices = await fetchFollowed(userId);
  console.log(latestInvoices)
  const result =  {
    result: {
      data: latestInvoices
    }
  }
  return NextResponse.json(result);
}
