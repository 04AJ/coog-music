
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const playlist_id = searchParams.get('playlist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, artist.artist_id, artist.artist_name 
    FROM track_to_playlist
    INNER JOIN track ON track.track_id = track_to_playlist.track_id
    INNER JOIN artist ON track.artist_id = artist.artist_id
    WHERE track_to_playlist.playlist_id = ${playlist_id};
    `
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const playlist_id = searchParams.get('playlist_id');
    const affected = await prisma.$executeRaw`DELETE FROM track_to_playlist WHERE track_id = ${track_id} AND playlist_id = ${playlist_id}`
    return new Response(JSON.stringify(affected));
}