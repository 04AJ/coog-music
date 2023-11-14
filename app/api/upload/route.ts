import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/client'

interface reqFormat {
    title: string,
    genre_id: number,
    artist_id: number,
    audio_url: string,
    image_url: string
}

export async function POST(req: Request) {
    const data: reqFormat = await req.json();
    let curDate = new Date();

    const result = await prisma.$executeRaw`INSERT INTO track (artist_id, track_path, track_name, created_at, updated_at, streams, track_img_path, genre_id ) VALUES (${data.artist_id}, ${data.audio_url}, ${data.title}, ${curDate},${curDate}, 0, ${data.image_url}, ${data.genre_id} );`;
    // console.log(result);
    return new Response(JSON.stringify(result));
}
