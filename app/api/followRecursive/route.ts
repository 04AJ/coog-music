
import prisma from '@/client'
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id1 = searchParams.get('listener_id1');
    const listener_id2 = searchParams.get('listener_id2');
    const track: [{}] = await prisma.$queryRaw`SELECT listener_id FROM listener_follows_listener WHERE listener_id = ${listener_id1} AND follower_id = ${listener_id2}`

    if (track[0]) {
        return new Response(JSON.stringify(true))

    }
    return new Response(JSON.stringify(false))

};


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id1 = searchParams.get('listener_id1');
    const listener_id2 = searchParams.get('listener_id2');
    const affected = await prisma.$executeRaw`DELETE FROM listener_follows_listener WHERE listener_id = ${listener_id1} AND follower_id = ${listener_id2}`
    // console.log(affected);
    return new Response(JSON.stringify(affected));
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id1 = searchParams.get('listener_id1');
    const listener_id2 = searchParams.get('listener_id2');
    const affected = await prisma.$executeRaw`INSERT INTO listener_follows_listener(listener_id, follower_id) VALUES (${listener_id1}, ${listener_id2})`

    return new Response(JSON.stringify(affected));
}