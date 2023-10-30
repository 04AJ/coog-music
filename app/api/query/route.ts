
import prisma from '@/client'
import { NextRequest } from "next/server";



//USER_ID is parameter
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.track_id = ${track_id} AND track.artist_id = artist.artist_id`
    return new Response(JSON.stringify(tracks))

};