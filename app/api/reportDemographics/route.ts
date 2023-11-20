
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
//change name to specify race demographics
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');


    const race = await prisma.$queryRaw<User[]>`
    // SELECT t.genre_id, genre_name , COUNT(genre_name) AS count
    // FROM liked_tracks AS lt, track AS t, genre AS g, user AS u
    // WHERE lt.track_id = t.track_id AND t.genre_id = g.genre_id AND lt.user_id = u.user_id 
        AND YEAR(u.birth_date) BETWEEN
    // GROUP BY t.genre_id
    // ORDER BY count DESC;`;
    const result = JSON.parse(JSON.stringify(race, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};




//      this will list the number of liked tracks for each genre
// select genre_name, count(liked_tracks.track_id) as num_liked
// from liked_tracks, track, genre
// where track.genre_id=genre.genre_id and liked_tracks.track_id = track.track_id
// group by genre_name;

//      this finds the preferred genre of user with id 7
// select t.genre_id, count(genre_name) as count
// from liked_tracks as lt, track as t, genre as g, user as u
// where lt.track_id = t.track_id and t.genre_id = g.genre_id and lt.user_id = u.user_id and u.user_id = 7
// group by genre_name
// limit 1;

//     this finds data for people born on 2001, it sees what how many songs of each genre they have liked
// select t.genre_id, genre_name , count(genre_name) as count
// from liked_tracks as lt, track as t, genre as g, user as u
// where lt.track_id = t.track_id and t.genre_id = g.genre_id and lt.user_id = u.user_id and YEAR(u.birth_date) = 2001
// group by t.genre_id
// order by count desc;
                    //for people 22 yrs old
        // and YEAR(u.birth_date) between (YEAR(CURDATE())-23) and (YEAR(CURDATE())-22)