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
    listener_id: number;
 }

export async function POST(req: Request){
    const data: reqFormat = await req.json();

    const result = await prisma.$executeRaw`
    INSERT INTO listener (user_id)
    VALUES (${data.userID})
    `
    console.log(typeof data.userID);
    console.log(data);
    console.log("this is user id,",data.userID)
    return new Response(JSON.stringify(result));
}

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get("user_id");
  
    const result: resFormat[]  = await prisma.$queryRaw`
      SELECT listener_id
      FROM listener
      WHERE user_id = ${user_id}
      `;
    // console.log(result[0].artist_id);
    return new Response(JSON.stringify(result));
  }