
import prisma from '@/client'
import { Playlist } from '@/types';
import { NextRequest } from "next/server";
import { Interface } from 'readline';

interface updateFormat{
    album_id: number;
    archive: number;
};

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const tracks = await prisma.$queryRaw<Playlist[]>`
    SELECT album_id, album_name, album_created_at, album_release_date, album_cover_path
    FROM album
    WHERE artist_id = ${artist_id} AND archive != 1;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};


// POST request to add tracks to track_to_album
export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const album_id = searchParams.get('album_id');
    let curDate = new Date();
    const affected = await prisma.$executeRaw`
    INSERT INTO track_to_album(album_id, track_id,track_inserted_at )
    VALUES (${album_id}, ${track_id}, ${curDate})`

    return new Response(JSON.stringify(affected));
}

export async function PATCH(req: Request) {
    const data: updateFormat = await req.json();

    const result = await prisma.$executeRaw`
    UPDATE album
    SET archive = ${data.archive}
    WHERE track_id = ${data.album_id};
    `;
    return new Response(JSON.stringify(result));
};