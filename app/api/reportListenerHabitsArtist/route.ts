
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
    select artist_name as artist, YEAR(curdate()) - YEAR(ua.birth_date) as age, ethnicity_name as ethn, gender_name as gender, count(lt.track_id) as likes,
    (select genre_name 
    from artist as a, track as t, genre as g 
    where t.artist_id = a.artist_id and t.genre_id = g.genre_id
    group by genre_name
    order by count(*) desc
    limit 1) as genre
  from artist as a, user as uu, user as ua, liked_tracks as lt, track as t, gender as g, ethnicity as e
  where lt.track_id = t.track_id and t.artist_id = a.artist_id and lt.user_id = uu.user_id
      and a.user_id = ua.user_id
      and uu.ethnicity_id in (${ethnicity}) and YEAR(uu.birth_date) between (YEAR(CURDATE())-${ageTwo}) and (YEAR(CURDATE())-${ageOne})
      and ua.ethnicity_id = e.ethnicity_id and ua.gender_id = g.gender_id
      and uu.gender_id in (${gender})
  group by artist_name, age, ethn, gender;`
    const result = 
        JSON.parse(JSON.stringify(trackRankings, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    return new Response(JSON.stringify(result));
};