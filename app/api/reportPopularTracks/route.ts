
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const gender = searchParams.get("gender")==='0' ? `1,2` : searchParams.get("gender");


    const trackRankings = await prisma.$queryRaw<Track[]>`
        SELECT track_name, track.track_id, artist.artist_name, COUNT(liked_tracks.track_id) AS likes
        FROM track, liked_tracks, artist, gender, genre, user
        WHERE track.track_id = liked_tracks.track_id AND track.artist_id = artist.artist_id 
                AND liked_tracks.user_id = user.user_id AND user.gender_id = gender.gender_id 
                AND gender.gender_id IN (${gender})
        GROUP BY track_name, track.track_id
        ORDER BY COUNT(liked_tracks.track_id) desc;`;
    const result = 
        JSON.parse(JSON.stringify(trackRankings, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    return new Response(JSON.stringify(result));
};