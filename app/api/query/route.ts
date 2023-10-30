
import prisma from '@/client'
import { NextRequest } from "next/server";



//USER_ID is parameter
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = ${id} AND ${id} = artist.user_id;`
    console.log(tracks);
    return new Response(JSON.stringify(tracks))

};