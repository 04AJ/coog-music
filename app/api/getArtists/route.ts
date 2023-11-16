
import prisma from '@/client'
import { Artist } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    
    const artists = await prisma.$queryRaw<Artist[]>`
        SELECT artist_name, artist_id FROM artist`;
    return new Response(JSON.stringify(artists));
};

