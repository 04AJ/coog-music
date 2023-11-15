import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/client'
import { NextRequest } from "next/server";


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


export async function PATCH(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const track_name = searchParams.get('track_name');
    const genre_id = searchParams.get('genre_id');
    const result = await prisma.$executeRaw`
    UPDATE track SET track_name = ${track_name}, genre_id = ${genre_id}
    WHERE track_id = ${track_id}
     `;


    return new Response(JSON.stringify(result));
}

// FIX THIS !!! FOREIGN KEY CONSTRAINT
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const affected = await prisma.$executeRaw`DELETE FROM track WHERE track_id = ${track_id}`
    return new Response(JSON.stringify(affected));
}