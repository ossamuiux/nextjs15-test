import { comments } from '@/app/comments/api/data';

export async function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
  const res = await request.json();

  comments.push(res);

  return Response.json(comments);
}
