
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
export async function GET(req: NextRequest) {
    const trackRankings = await prisma.$queryRaw<Track[]>`
        SELECT track_name, track.track_id, artist.artist_name, COUNT(liked_tracks.track_id) AS likes
        FROM track, liked_tracks, artist
        WHERE track.track_id = liked_tracks.track_id AND track.artist_id = artist.artist_id
        group by track_name, track.track_id
        order by COUNT(liked_tracks.track_id) desc;`;
    const result = 
        JSON.parse(JSON.stringify(trackRankings, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    return new Response(JSON.stringify(result));
};