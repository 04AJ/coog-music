import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/client'
import { NextRequest } from "next/server";


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
export async function PATCH(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const album_id = searchParams.get('album_id');
    const album_name = searchParams.get('album_name');
    const result = await prisma.$executeRaw`
    UPDATE album SET album_name = ${album_name}
    WHERE album_id = ${album_id}
     `;


    return new Response(JSON.stringify(result));
}
