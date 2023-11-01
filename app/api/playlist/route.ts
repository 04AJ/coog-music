
import prisma from '@/client'
import { Playlist } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const tracks = await prisma.$queryRaw<Playlist[]>`
    SELECT playlist_id, playlist_name, playlist_created_at, playlist_updated_at 
    FROM playlist
    WHERE listener_id = ${listener_id};`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};


//POST request to add tracks to track_to_playlist
export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const playlist_id = searchParams.get('playlist_id');
    let curDate = new Date();
    const affected = await prisma.$executeRaw`INSERT INTO track_to_playlist(playlist_id, track_id,track_inserted_at ) VALUES (${playlist_id}, ${track_id}, ${curDate})`

    return new Response(JSON.stringify(affected));
}