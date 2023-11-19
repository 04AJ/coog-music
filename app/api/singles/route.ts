
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, artist.artist_id, artist_name 
    FROM track 
    JOIN artist ON track.artist_id = ${artist_id} 
    LEFT JOIN track_to_album ON track.track_id = track_to_album.track_id
    WHERE track_to_album.track_id = NULL AND track.archive != 1;
    `

    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};

/*

    FROM track_to_album, track, artist
    WHERE track.artist_id = ${artist_id} AND track.track_id NOT IN (SELECT track_to_album.track_id FROM track_to_album) AND track.archive != 1;`


    */