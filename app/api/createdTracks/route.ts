
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
    FROM track, artist 
    WHERE track.artist_id = artist.artist_id AND track.artist_id = ${artist_id} AND track.archive != 1;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};