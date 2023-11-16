
import prisma from '@/client'
import { Prisma } from "@prisma/client";
import { Track } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const eths = Prisma.join(['1','2','3','4']);
    const gens = Prisma.join(['1','2','3','4','5','6','7','8','9','10']);
    const gend = Prisma.join(['1','2']);
    const searchParams = req.nextUrl.searchParams;
    const gender = searchParams.get("gender")==='0' ? gend : searchParams.get("gender");
    const genre = searchParams.get("genre")==='0' ? gens : searchParams.get("genre");
    const ethnicity = searchParams.get("ethnicity")==='0' ? eths : searchParams.get("ethnicity");


    const trackRankings = await prisma.$queryRaw<Track[]>`
        SELECT track_name, track.track_id, artist.artist_name, track.genre_id, COUNT(liked_tracks.track_id) AS likes
        FROM track, liked_tracks, artist, gender, genre, user
        WHERE track.track_id = liked_tracks.track_id AND track.artist_id = artist.artist_id 
                AND liked_tracks.user_id = user.user_id
                AND user.gender_id = gender.gender_id AND gender.gender_id IN (${gender}) 
                AND track.genre_id = genre.genre_id AND track.genre_id IN (${genre}) 
                AND user.ethnicity_id IN (${ethnicity})
        GROUP BY track_name, track.track_id, artist.artist_name
        ORDER BY COUNT(liked_tracks.track_id) desc;`;
    const result = 
        JSON.parse(JSON.stringify(trackRankings, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));
    return new Response(JSON.stringify(result));
};