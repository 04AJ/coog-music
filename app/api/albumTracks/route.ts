
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const album_id = searchParams.get('album_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, artist.artist_id, artist_name 
    FROM track_to_album, track, artist 
    WHERE track_to_album.album_id = ${album_id} 
    AND track.artist_id = artist.artist_id 
    AND track.track_id = track_to_album.track_id
    AND track.archive != 1;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};