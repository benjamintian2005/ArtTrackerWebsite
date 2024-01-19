
import { NextRequest, NextResponse } from 'next/server'
import {setFollowing} from '@/app/lib/data';

export async function POST(request: NextRequest) {
    const body = await request.json()
    const post = await setFollowing(body);
  
  
    return NextResponse.json(post)
  
  }