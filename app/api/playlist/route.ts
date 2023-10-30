import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



interface reqFormat {
    playlistName: string,
    listenerId: number
}

export async function POST(req: Request) {
    const data: reqFormat = await req.json();
    let curDate = new Date();

    const result = await prisma.$executeRaw`INSERT INTO playlist (playlist_name, listener_id, playlist_created_at, playlist_updated_at) VALUES (${data.playlistName}, ${data.listenerId}, ${curDate}, ${curDate});`;
    // console.log(result);
    return new Response(JSON.stringify(result));
}
