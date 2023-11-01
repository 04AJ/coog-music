
import prisma from '@/client'
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const track_id = searchParams.get('track_id');
    const track: [{}] = await prisma.$queryRaw`SELECT track_id FROM liked_tracks WHERE user_id = ${user_id} AND track_id = ${track_id}`


    if (track[0]) {
        return new Response(JSON.stringify(true))

    }
    return new Response(JSON.stringify(false))

};


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const track_id = searchParams.get('track_id');
    const affected = await prisma.$executeRaw`DELETE FROM liked_tracks WHERE user_id = ${user_id} AND track_id = ${track_id}`
    console.log(affected);
    return new Response(JSON.stringify(affected));
}

export async function POST(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const track_id = searchParams.get('track_id');
    const affected = await prisma.$executeRaw`INSERT INTO liked_tracks(user_id, track_id) VALUES (${user_id}, ${track_id})`

    return new Response(JSON.stringify(affected));
}