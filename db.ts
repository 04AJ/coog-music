import { PrismaClient } from "@prisma/client";
import { Track } from "@/types";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function createUser() {
  const newUser = await prisma.$executeRaw`
    INSERT INTO user (user_name,password,birth_date,join_date,email,ethnicity_id,gender_id)
    VALUES ('myusername1234','mypassword','2001-01-02','2001-01-02','testuser2@icloud.com',1,1)
    `;
  return (newUser as any) || [];
}

// export async function loginUser(){
//     c
// }

export const getTracks = async (): Promise<Track[]> => {
  const tracks =
    await prisma.$queryRaw`SELECT track_name, track_path, track_img_path, artist_id FROM track`;
  // console.log(tracks);
  // return new Response(JSON.stringify(tracks))

  return (tracks as any) || [];
};
