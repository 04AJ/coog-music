
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) { // gets all tracks from specific artist that do not belong in an album
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    FROM track t
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