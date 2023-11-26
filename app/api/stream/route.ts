
import prisma from '@/client'
import { NextRequest } from "next/server";


//UPDATE users SET login_count = login_count + 1 WHERE id = 1;

export async function PATCH(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const affected = await prisma.$executeRaw`
    UPDATE TRACK SET streams = streams + 1 WHERE track_id = ${track_id}`;


    return new Response(JSON.stringify(affected));
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const track: [{}] = await prisma.$queryRaw`SELECT SUM(streams) as streams FROM track WHERE artist_id = ${artist_id} AND archive = 0`

    return new Response(JSON.stringify(track[0]));



};