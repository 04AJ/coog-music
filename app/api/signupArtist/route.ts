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

export async function POST(req: Request){
    const data: reqFormat = await req.json();
    const curDate = new Date();
    console.log(data);
    const result = await prisma.$executeRaw`
    INSERT INTO artist (user_id,artist_name,artist_join_date,artist_email)
    VALUES (${data.userID},${data.username},${curDate},${data.email})
    `
    console.log("userid: %d", data.userID)
    return new Response(JSON.stringify(result));
}