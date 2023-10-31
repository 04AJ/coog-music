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

    const result = await prisma.$executeRaw`
    INSERT INTO listener (user_id)
    VALUES (${data.userID})
    `
    console.log(typeof data.userID);
    console.log(data);
    console.log("this is user id,",data.userID)
    return new Response(JSON.stringify(result));
}