
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";

//unfinished

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const gender = await prisma.$queryRaw<User[]>`

        SELECT
        CONCAT(ROUND(SUM(IF(age BETWEEN 0 and 15,1,0))/COUNT(*) * 100,1), '%') as one,
        CONCAT(ROUND(SUM(IF(age BETWEEN 16 and 25,1,0))/COUNT(*) * 100,1), '%') as two,
        CONCAT(ROUND(SUM(IF(age BETWEEN 26 and 35,1,0))/COUNT(*) * 100,1), '%') as three,
        CONCAT(ROUND(SUM(IF(age BETWEEN 36 and 45,1,0))/COUNT(*) * 100,1), '%') as four,
        CONCAT(ROUND(SUM(IF(age >= 46,1,0))/COUNT(*) * 100,1), '%') as five,
        CONCAT(ROUND(SUM(IF(age IS NULL,1,0))/COUNT(*) * 100,1), '%') as six

        FROM (
            SELECT TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age 
            FROM user, listener_follows_artists as lfa, listener as l, artist as a
            WHERE lfa.listener_id = l.listener_id AND l.user_id = user.user_id AND lfa.artist_id = a.artist_id AND a.artist_email = ${query}
            ) as derived;`;
    const result = JSON.parse(JSON.stringify(gender, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value// return everything else unchanged 
    ));
    return new Response(JSON.stringify(result));
};