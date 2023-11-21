import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/client'
import { NextRequest } from "next/server";


interface reqFormat {
    title: string,
    listener_id: number
}

export async function POST(req: Request) {
    const data: reqFormat = await req.json();
    let curDate = new Date();

    const result = await prisma.$executeRaw`INSERT INTO playlist (listener_id, playlist_name, playlist_created_at, playlist_updated_at) 
    VALUES (${data.listener_id}, ${data.title} , ${curDate}, ${curDate} );`;
    // console.log(result);
    return new Response(JSON.stringify(result));
}
export async function PATCH(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const playlist_id = searchParams.get('playlist_id');
    const playlist_name = searchParams.get('playlist_name');
    const result = await prisma.$executeRaw`
    UPDATE playlist SET playlist_name = ${playlist_name}
    WHERE playlist_id = ${playlist_id}
     `;


    return new Response(JSON.stringify(result));
}
