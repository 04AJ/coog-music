import { NextRequest } from "next/server";
import prisma from "@/client";



 interface resFormat {
    listener_id: number;
 }

// admin is created in database so no POST request needed

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