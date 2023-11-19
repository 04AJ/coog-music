
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



// export async function GET(req: NextRequest) {
//     const searchParams = req.nextUrl.searchParams;
//     const playlist_id = searchParams.get('playlist_id');
//     const tracks = await prisma.$queryRaw<Track[]>`
//     SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, artist.artist_id, artist_name 
//     FROM track_to_playlist, track, artist 
//     WHERE track_to_playlist.playlist_id = ${playlist_id} AND track.artist_id = artist.user_id AND track.track_id = track_to_playlist.track_id`
//     // console.log(tracks);
//     return new Response(JSON.stringify(tracks))

// };

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const playlist_id = searchParams.get('playlist_id');
    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT track.track_id, track.track_name, track.track_path, track.track_img_path, track.genre_id, artist.artist_id, artist.artist_name 
    FROM track_to_playlist
    INNER JOIN track ON track.track_id = track_to_playlist.track_id
    INNER JOIN artist ON track.artist_id = artist.artist_id
    WHERE track_to_playlist.playlist_id = ${playlist_id} AND track.archive = 0;
    `
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const playlist_id = searchParams.get('playlist_id');
    let curDate = new Date();
    const affected = await prisma.$executeRaw`DELETE FROM track_to_playlist WHERE track_id = ${track_id} AND playlist_id = ${playlist_id}`;
    const updated = await prisma.$executeRaw`UPDATE PLAYLIST SET playlist_updated_at = ${curDate} WHERE playlist_id = ${playlist_id}`;

    return new Response(JSON.stringify(affected));
}