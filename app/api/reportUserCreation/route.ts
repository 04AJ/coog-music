
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const From = searchParams.get('from_date');
    const To = searchParams.get('to_date');
    const fromQuery = `${From}`;
    const toQuery = `${To}`;
    const users = await prisma.$queryRaw<User[]>`
        Select user_name, user_id, join_date
        FROM user 
        WHERE join_date >= '2003-03-29 00:00:00' AND join_date <= '2023-11-03 23:59:00'
        group by user_name, user_id, join_date;`;
    const result = JSON.parse(JSON.stringify(users, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};