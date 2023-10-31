import { PrismaClient } from "@prisma/client";
import { Track } from "@/types";
import { cookies } from "next/headers";

const prisma = new PrismaClient();


export const getTracks = async (): Promise<Track[]> => {
  const tracks =
    await prisma.$queryRaw`SELECT track_name, track_path, track_img_path, artist_id FROM track`;
  // console.log(tracks);
  // return new Response(JSON.stringify(tracks))

  return (tracks as any) || [];
};

export async function createUser() {
  const newUser = await prisma.$executeRaw`
    INSERT INTO user (user_name,password,birth_date,join_date,email,ethnicity_id,gender_id)
    VALUES ('myusername1234','mypassword','2001-01-02','2001-01-02','testuser2@icloud.com',1,1)
    `;
  return (newUser as any) || [];
}





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

export async function getLikedTracks(user_id: string): Promise<Track[]> {
  const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM liked_tracks, track, artist WHERE track.artist_id = artist.user_id AND liked_tracks.user_id = ${user_id};`
  return (tracks as any) || [];

}





interface trackRequest {
  title: string,
  artist: string,
  audio_url: string,
  image_url: string
}




