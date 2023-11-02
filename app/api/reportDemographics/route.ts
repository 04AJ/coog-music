
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}%`;
    const artists = await prisma.$queryRaw<User[]>`
        DECLARE @result1 = (race INT, percent INT);
        SELECT * FROM @result1;`;
    return new Response(JSON.stringify(artists));
};