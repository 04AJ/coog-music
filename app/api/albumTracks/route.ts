
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const album_id = searchParams.get('album_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, artist.artist_id, artist_name 
    FROM track_to_album, track, artist 
    WHERE track_to_album.album_id = ${album_id} AND track.artist_id = artist.artist_id AND track.track_id = track_to_album.track_id`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const album_id = searchParams.get('album_id');
    const affected = await prisma.$executeRaw`DELETE FROM track_to_album WHERE track_id = ${track_id} AND album_id = ${album_id}`
    return new Response(JSON.stringify(affected));
}