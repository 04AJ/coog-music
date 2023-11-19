
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
//change name to specify race demographics
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const race = await prisma.$queryRaw<User[]>`
        SELECT race_name, COUNT(*) AS Total , ((COUNT(*) / (SELECT COUNT(*)
                                                            FROM artist as A, race as R, user as U, listener_follows_artists as LFA, listener as L
                                                            WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.race_id = R.race_id)) * 100) AS PERCENT
        FROM race as R, user as U, listener_follows_artists as LFA, listener as L
        WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.race_id = R.race_id
        GROUP BY race_name;`;
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