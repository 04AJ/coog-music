
import prisma from '@/client'
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const artist_id = searchParams.get('artist_id');
    const track: [{}] = await prisma.$queryRaw`SELECT artist_id FROM listener_follows_artists WHERE listener_id = ${listener_id} AND artist_id = ${artist_id}`

    if (track[0]) {
        return new Response(JSON.stringify(true))

    }
    return new Response(JSON.stringify(false))

};


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const artist_id = searchParams.get('artist_id');
    const affected = await prisma.$executeRaw`DELETE FROM listener_follows_artists WHERE listener_id = ${listener_id} AND artist_id = ${artist_id}`
    // console.log(affected);
    return new Response(JSON.stringify(affected));
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const artist_id = searchParams.get('artist_id');
    const affected = await prisma.$executeRaw`INSERT INTO listener_follows_artists(listener_id, artist_id) VALUES (${listener_id}, ${artist_id})`

    return new Response(JSON.stringify(affected));
}