
import prisma from '@/client'
import { Artist } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_name = searchParams.get('artist_name');
    const query = `${artist_name}%`;
    const artists = await prisma.$queryRaw<Artist[]>`
        SELECT artist_name, artist.artist_id, COUNT(lfa.listener_id) as followers, artist_email
        FROM artist, listener_follows_artists as lfa
        WHERE lfa.artist_id = artist.artist_id AND artist_name LIKE ${query}
        GROUP BY artist_name, artist.artist_id`;
    const result = 
    JSON.parse(JSON.stringify(artists, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};


