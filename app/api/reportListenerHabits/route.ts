
import prisma from '@/client'
import { Prisma } from "@prisma/client";
import { Track } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const eths = Prisma.join(['1','2','3','4']); //joining the select inputs to make it queryable
    const ages = Prisma.join(['1','2','3','4','5']);
    const gend = Prisma.join(['1','2']);
    const searchParams = req.nextUrl.searchParams;
    const gender = searchParams.get("gender")==='0' ? gend : searchParams.get("gender");
    const ageGroup = searchParams.get("ageGroup")==='0' ? ages : searchParams.get("ageGroup");
    const ethnicity = searchParams.get("ethnicity")==='0' ? eths : searchParams.get("ethnicity");


    const trackRankings = await prisma.$queryRaw<Track[]>`
        SELECT track_name, track.track_id, artist.artist_name, artist.artist_email, track.genre_id, track.streams, track.created_at, COUNT(liked_tracks.track_id) AS likes
        FROM track, liked_tracks, artist, gender, genre, user
        WHERE track.track_id = liked_tracks.track_id AND track.artist_id = artist.artist_id 
                AND liked_tracks.user_id = user.user_id
                AND user.gender_id = gender.gender_id AND gender.gender_id IN (${gender}) 
                AND track.genre_id = genre.genre_id AND track.genre_id IN (${ageGroup}) 
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