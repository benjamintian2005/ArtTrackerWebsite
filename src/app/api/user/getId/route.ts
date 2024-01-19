import { NextRequest, NextResponse } from 'next/server'
import {getUserId} from '@/app/lib/data';


export async function GET(request : NextRequest) {
  const userEmail = request.nextUrl.searchParams.get("UserEmail")
  
  if(userEmail == null) return  NextResponse.json([])

  const latestInvoices = await getUserId(userEmail);
  console.log(latestInvoices)
  const result =  {
    result: {
      data: latestInvoices
    }
  }
  return NextResponse.json(result);
}
