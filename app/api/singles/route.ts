
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, a.artist_id, a.artist_name 
    FROM track t
    LEFT JOIN artist a on track.artist_id = a.artist_id
    LEFT JOIN track_to_album ta ON t.track_id = ta.track_id
    WHERE ta.album_id IS NULL
    AND t.artist_id = ${artist_id};
    `
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};

/*

    FROM track_to_album, track, artist
    WHERE track.artist_id = ${artist_id} AND track.track_id NOT IN (SELECT track_to_album.track_id FROM track_to_album) AND track.archive != 1;`


    */