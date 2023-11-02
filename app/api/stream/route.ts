
import prisma from '@/client'
import { NextRequest } from "next/server";


//UPDATE users SET login_count = login_count + 1 WHERE id = 1;

export async function PATCH(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const track_id = searchParams.get('track_id');
    const affected = await prisma.$executeRaw`
    UPDATE TRACK SET streams = streams + 1 WHERE track_id = ${track_id}`

    return new Response(JSON.stringify(affected));
}