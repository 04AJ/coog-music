
import prisma from '@/client'
import { Artist } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_name = searchParams.get('artist_name');
    const query = `${artist_name}%`;
    const artists = await prisma.$queryRaw<Artist[]>`
        SELECT artist_name, artist_id 
        FROM artist 
        WHERE artist_name LIKE ${query}`;
    return new Response(JSON.stringify(artists));
};


