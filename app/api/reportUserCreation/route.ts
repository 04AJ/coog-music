
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const From = searchParams.get('from_date');
    let To = searchParams.get('to_date');
    const showListeners = searchParams.get('listeners');
    const showArtists = searchParams.get('artists'); 


    let artistsOnly = false//((showListeners==='false') && showArtists==='true')
    const listenersOnly = false//(showListeners && (!showArtists))
    
    
    // if(To === ''){ 
    //     const users = await prisma.$queryRaw<User[]>`
    //         Select user_name, user_id, join_date
    //         FROM user
    //         WHERE join_date >= ${From} 
    //         group by user_name, user_id, join_date;`;
    //     const result = JSON.parse(JSON.stringify(users, (key, value) =>
    //         typeof value === 'bigint'
    //             ? value.toString()
    //             : value // return everything else unchanged
    //     ));
    //     return new Response(JSON.stringify(result));
    // }
    let users = await prisma.$queryRaw<User[]>`
        Select user_name, user_id, join_date, is_artist
        FROM user 
        WHERE join_date >= ${From} AND join_date <= ${To}
        group by user_name, user_id, join_date;`;
    if(artistsOnly){
        users = await prisma.$queryRaw<User[]>`
            Select user_name, user_id, join_date, is_artist
            FROM user 
            WHERE join_date >= ${From} AND join_date <= ${To} AND is_artist = 1
            group by user_name, user_id, join_date;`;
    }
    if(listenersOnly){ //wow this is so shit, but idc
        users = await prisma.$queryRaw<User[]>`
            Select user_name, user_id, join_date, is_artist
            FROM user 
            WHERE join_date >= ${From} AND join_date <= ${To} AND (is_artist = 0 OR is_artist IS NULL)
            group by user_name, user_id, join_date;`;
    }
    const result = JSON.parse(JSON.stringify(users, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};