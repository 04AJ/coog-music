
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const genre_id = searchParams.get('genre_id');
    const all = searchParams.get('all');
    let tracks;
    if (all === '0') {
        tracks = await prisma.$queryRaw<Track[]>`
        SELECT track.track_id, track.genre_id, track.track_name, track.track_path, track.track_img_path, artist.artist_id, artist_name 
        FROM track, artist 
        WHERE track.genre_id = ${genre_id} AND track.artist_id = artist.artist_id AND track.archive = 0`

    }
    else {
        tracks = await prisma.$queryRaw<Track[]>`
    SELECT track_id, genre_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
    FROM track, artist 
    WHERE track.artist_id = artist.artist_id AND (track.archive != 1);`
    }

    return new Response(JSON.stringify(tracks))

};