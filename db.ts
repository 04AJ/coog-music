import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

import { Track } from "@/types";


const prisma = new PrismaClient();

export async function getTracks(): Promise<Track[]> {
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id;`
    // console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (tracks as any) || [];
};

export async function getTracksById(artist_id: number): Promise<Track[]> {
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id AND artist.artist_id = ${artist_id};`
    // console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (tracks as any) || [];
};

interface trackRequest {
    title: string,
    artist: string,
    audio_url: string,
    image_url: string
}

export async function postTracks(req: trackRequest) {
    const data: trackRequest = req;
    console.log(data);
    let curDate = new Date();

    // const result = await prisma.$executeRaw`INSERT INTO track (artist_id, track_path, track_name, created_at, updated_at, streams, track_img_path ) VALUES (1, ${data.audio_url}, ${data.title}, ${curDate},${curDate}, 0, ${data.image_url} );`;
    // console.log(result);

}


