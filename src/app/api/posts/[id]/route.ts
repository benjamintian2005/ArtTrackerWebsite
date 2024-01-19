import { NextRequest, NextResponse } from 'next/server'
import { fetchPost, deletePost, editPost} from '@/app/lib/data';

export async function GET(request : NextRequest,{ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  
  return NextResponse.json(post);

}
export async function PUT(request: NextRequest,{ params }: { params: { id: string } }) {
  const body = await request.json();
  const post = await editPost(params.id, body);
  return NextResponse.json(post)

}
export async function DELETE(request: NextRequest,{ params }: { params: { id: string } }) {
  const post = await deletePost(params.id);
  return NextResponse.json(post)

}