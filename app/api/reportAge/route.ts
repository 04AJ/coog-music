
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
            '%' as '',
            SUM(IF(age BETWEEN 0 and 15,1,0))/COUNT(*) * 100 as '1',
            SUM(IF(age BETWEEN 16 and 25,1,0))/COUNT(*) * 100 as '2',
            SUM(IF(age BETWEEN 26 and 35,1,0))/COUNT(*) * 100 '3',
            SUM(IF(age BETWEEN 36 and 45,1,0))/COUNT(*) * 100 as '4',
            SUM(IF(age >=46, 1, 0))/COUNT(*) * 100 as '5',
            SUM(IF(age IS NULL, 1, 0))/COUNT(*)*100 as '6'
        
        FROM (
            SELECT TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age 
            FROM user, listener_follows_artists as lfa, listener as l, artist as a
            WHERE lfa.listener_id = l.listener_id AND l.user_id = user.user_id AND lfa.artist_id = a.artist_id AND a.artist_email = ${query}
            ) as derived;`;
    const result = JSON.parse(JSON.stringify(gender, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};