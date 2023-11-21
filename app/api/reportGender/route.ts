
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const gender = await prisma.$queryRaw<User[]>`
        SELECT gender_name, COUNT(*) AS Total , ((COUNT(*) / (SELECT COUNT(*)
                                                            FROM artist as A, gender as G, user as U, listener_follows_artists as LFA, listener as L
                                                            WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.gender_id = G.gender_id)) * 100) AS PERCENT
        FROM artist as A, gender as G, user as U, listener_follows_artists as LFA, listener as L
        WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.gender_id = G.gender_id
        GROUP BY gender_name;`;
    const result = JSON.parse(JSON.stringify(gender, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};