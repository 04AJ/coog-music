
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const From = searchParams.get('from_date');
    const To = searchParams.get('to_date');
    // if(From === '2023-10-30'){
    //     return new Response("right");
    // } else{
    //     return new Response("no");
    // }
    if(To === ''){ //give all users from beginning of time to _
        const users = await prisma.$queryRaw<User[]>`
            Select user_name, user_id, join_date
            FROM user 
            WHERE join_date >= ${From}
            group by user_name, user_id, join_date;`;
        const result = JSON.parse(JSON.stringify(users, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
        return new Response(JSON.stringify(result));
    }
    

    const users = await prisma.$queryRaw<User[]>`
        Select user_name, user_id, join_date
        FROM user 
        WHERE join_date >= ${From} AND join_date <= ${To}
        group by user_name, user_id, join_date;`;
    const result = JSON.parse(JSON.stringify(users, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};