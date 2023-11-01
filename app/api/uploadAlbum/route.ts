import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/client'

interface reqFormat {
    title: string,
    artist_id: number,
    image_url: string
}

export async function POST(req: Request) {
    const data: reqFormat = await req.json();
    let curDate = new Date();

    const result = await prisma.$executeRaw`INSERT INTO album (artist_id, album_name, album_created_at, album_release_date, album_cover_path) 
    VALUES (${data.artist_id}, ${data.title} , ${curDate}, ${curDate}, ${data.image_url} );`;
    // console.log(result);
    return new Response(JSON.stringify(result));
}
