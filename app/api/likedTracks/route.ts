
import prisma from '@/client'
import { NextRequest } from "next/server";



//USER_ID is parameter
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM liked_tracks, track, artist WHERE track.artist_id = artist.user_id AND liked_tracks.user_id = ${user_id};`
    return new Response(JSON.stringify(tracks))

};