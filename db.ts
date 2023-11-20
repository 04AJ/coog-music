import { PrismaClient } from "@prisma/client";
import { SuperUser, Track } from "@/types";
import { cookies } from "next/headers";

const prisma = new PrismaClient();



export async function getTracks(): Promise<Track[]> {

  const tracks = await prisma.$queryRaw`
  SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
  FROM track, artist 
  WHERE track.artist_id = artist.artist_id AND (track.archive != 1);`
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

  const tracks = await prisma.$queryRaw`
  SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
  FROM track, artist 
  WHERE track.artist_id = artist.artist_id AND track_id = ${id};`
  // console.log(tracks);
  // return new Response(JSON.stringify(tracks))



  return (tracks as any) || [];
};

export async function getTracksByTitle(title: string): Promise<Track[]> {

  const query = `%${title}%`;
  const tracks = await prisma.$queryRaw`
  SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
  FROM track, artist 
  WHERE track.artist_id = artist.artist_id AND (track_name LIKE ${query} OR artist_name LIKE ${query}) AND track.archive = 0;`
  // console.log(tracks);
  // return new Response(JSON.stringify(tracks))



  return (tracks as any) || [];
};



//Getting listener info
export async function getListenerByName(name: string): Promise<SuperUser[]> {
  const query = `%${name}%`;
  const users = await prisma.$queryRaw`
  SELECT user.user_id, user_name, password, birth_date, join_date, email, race_name, ethnicity_name, gender_name, listener_id, is_artist
  FROM user, listener, race, ethnicity, gender
  WHERE user_name LIKE ${query} AND (user.user_id = listener.user_id )
  AND user.gender_id = gender.gender_id AND user.ethnicity_id = ethnicity.ethnicity_id AND user.race_id = race.race_id AND  user.is_artist = 0 AND user.is_admin = 0 AND user.archive = 0`
  // console.log(users);
  // return new Response(JSON.stringify(tracks)) 

  return (users as any) || [];
};

//Getting artist info
export async function getArtistByName(name: string): Promise<SuperUser[]> {
  const query = `%${name}%`;
  const users = await prisma.$queryRaw`
  SELECT user.user_id, user_name, password, birth_date, join_date, email, race_name, ethnicity_name, gender_name, artist_id, is_artist
  FROM user, artist, race, ethnicity, gender
  WHERE user_name LIKE ${query} AND (user.user_id = artist.user_id )
  AND user.gender_id = gender.gender_id AND user.ethnicity_id = ethnicity.ethnicity_id AND user.race_id = race.race_id AND user.is_admin = 0 AND user.archive = 0`
  // console.log(users);
  // return new Response(JSON.stringify(tracks)) 

  return (users as any) || [];
};

export async function getUserId(email: string, password: string): Promise<number> {
  return 1;
}

export async function getLikedTracks(user_id: string): Promise<Track[]> {
  const tracks = await prisma.$queryRaw`
  SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
  FROM liked_tracks, track, artist 
  WHERE track.artist_id = artist.user_id AND liked_tracks.user_id = ${user_id} AND track.archive != 1;`
  return (tracks as any) || [];

}





interface trackRequest {
  title: string,
  artist: string,
  audio_url: string,
  image_url: string
}


export async function getArtistFollowersEmails() {
  const emails = await prisma.$queryRaw`SELECT * FROM email_queue`
  return (emails as any) || [];
}

