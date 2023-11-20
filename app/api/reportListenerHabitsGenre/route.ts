
import prisma from '@/client'
import { Prisma } from "@prisma/client";
import { Track } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const eths = Prisma.join(['1','2','3','4']); //joining the select inputs to make it queryable
    const gend = Prisma.join(['1','2']);
    const searchParams = req.nextUrl.searchParams;
    const gender = searchParams.get("gender")==='0' ? gend : searchParams.get("gender");
    const ethnicity = searchParams.get("ethnicity")==='0' ? eths : searchParams.get("ethnicity");
    const ageOne = searchParams.get("ageOne");
    const ageTwo = searchParams.get("ageTwo");


    const trackRankings = await prisma.$queryRaw<Track[]>`
        select t.genre_id, genre_name , count(genre_name) as count
        from liked_tracks as lt, track as t, genre as g, user as u
        where lt.track_id = t.track_id and t.genre_id = g.genre_id and lt.user_id = u.user_id
            and YEAR(u.birth_date) between (YEAR(CURDATE())-${ageTwo}) and (YEAR(CURDATE())-${ageOne})
            and u.ethnicity_id IN (${ethnicity})
            and u.gender_id IN (${gender})
        group by t.genre_id
        order by count desc;`
    const result = 
        JSON.parse(JSON.stringify(trackRankings, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    return new Response(JSON.stringify(result));
};



//     this finds data for people born on 2001, it sees what how many songs of each genre they have liked
// select t.genre_id, genre_name , count(genre_name) as count
// from liked_tracks as lt, track as t, genre as g, user as u
// where lt.track_id = t.track_id and t.genre_id = g.genre_id and lt.user_id = u.user_id and YEAR(u.birth_date) = 2001
// group by t.genre_id
// order by count desc;
                    //for people 22 yrs old
        // and YEAR(u.birth_date) between (YEAR(CURDATE())-23) and (YEAR(CURDATE())-22)