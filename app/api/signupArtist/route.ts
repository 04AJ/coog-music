import { NextRequest } from "next/server";
import prisma from "@/client";

interface reqFormat {
    username: string;
    role: string;
    email: string;
    password: string;
    birthdate: string;
    race: string;
    ethnicity: string;
    gender: string;
    userID:number;
}

interface resFormat {
  artist_id: number;
}

export async function POST(req: Request){
    const data: reqFormat = await req.json();
    const curDate = new Date();
    const result = await prisma.$executeRaw`
    INSERT INTO artist (user_id,artist_name,artist_join_date,artist_email)
    VALUES (${data.userID},${data.username},${curDate},${data.email})
    `
    return new Response(JSON.stringify(result));
}

export async function GET(req: NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const user_id = searchParams.get("user_id");

  const result: resFormat[]  = await prisma.$queryRaw`
    SELECT artist_id
    FROM artist
    WHERE user_id = ${user_id}
    `;
  // console.log(result[0].artist_id);
  return new Response(JSON.stringify(result));
}