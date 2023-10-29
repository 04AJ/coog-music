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

export async function getTrackById(id?: number): Promise<Track[]> {

    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id AND track_id = ${id};`
    console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (tracks as any) || [];
};

export async function getTracksByTitle(title: string): Promise<Track[]> {
    const query = `%${title}%`;
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id AND (track_name LIKE ${query} OR artist_name LIKE ${query});`
    // console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (tracks as any) || [];
};

export async function getUserId(email: string, password: string): Promise<number> {
    return 1;
}

export async function getLiked(track_id: number, user_id?: number): Promise<string> {

    const track = await prisma.$queryRaw`SELECT track_id FROM liked_tracks WHERE user_id = ${user_id} AND track_id = ${track_id}`
    // console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (track as any) || null;
};

export async function unlikeTrack(track_id: number, user_id?: number): Promise<number> {

    const affected = await prisma.$executeRaw`DELETE FROM liked_tracks WHERE user_id = ${user_id} AND track_id = ${track_id}`

    return affected;
}

export async function likeTrack(track_id: number, user_id?: number): Promise<number> {

    const affected = await prisma.$executeRaw`INSERT INTO liked_tracks(user_id, track_id) VALUES (${user_id}, ${track_id})`

    return affected;
}

interface trackRequest {
    title: string,
    artist: string,
    audio_url: string,
    image_url: string
}

/* NOT WORKING

export async function postTracks(req: trackRequest) {
    const data: trackRequest = req;
    console.log(data);
    let curDate = new Date();

    // const result = await prisma.$executeRaw`INSERT INTO track (artist_id, track_path, track_name, created_at, updated_at, streams, track_img_path ) VALUES (1, ${data.audio_url}, ${data.title}, ${curDate},${curDate}, 0, ${data.image_url} );`;
    // console.log(result);

}
*/

