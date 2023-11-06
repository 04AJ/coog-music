
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const gender = await prisma.$queryRaw<User[]>`
        SELECT gender_name, COUNT(*) AS Total , ((COUNT(*) / (SELECT COUNT(*)
                                                            FROM gender as G, user as U, listener_follows_artists as LFA, listener as L
                                                            WHERE LFA.artist_id = ${query} AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.gender_id = G.gender_id)) * 100) AS PERCENT
        FROM gender as G, user as U, listener_follows_artists as LFA, listener as L
        WHERE LFA.artist_id = ${query} AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.gender_id = G.gender_id
        GROUP BY gender_name;`;
    const result = JSON.parse(JSON.stringify(gender, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};