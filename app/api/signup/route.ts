import { NextRequest } from "next/server";
import prisma from "@/client";

interface reqFormat {
  username: string;
  role: string;
  email: string;
  password: string;
  birthdate: string;
  race: string;
  ethnicity: string;
  gender: string;
}

interface updateFormat {
  userId: number;
  race_id: string;
  ethnicity_id: string;
  gender_id: string;
}



interface resFormat {
  user_id: number;
  is_artist: number;
  is_admin: number;
}


export async function POST(req: Request) {
  const data: reqFormat = await req.json();
  let curDate = new Date();
  let isAdmin, isArtist;
  if (data.role === "artist") {
    isArtist = 1;
    isAdmin = 0;
  } else {
    isArtist = 0;
    isAdmin = 0;
  }

  const result = await prisma.$executeRaw`
    INSERT INTO user (user_name,password,birth_date,join_date,email,is_artist,is_admin,race_id,ethnicity_id,gender_id)
    VALUES (${data.username},${data.password},${data.birthdate},${curDate},${data.email},${isArtist},${isAdmin},${data.race},${data.ethnicity},${data.gender})
    `;

  return new Response(JSON.stringify(result));
}


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get("email");
  const result: resFormat[] = await prisma.$queryRaw`
    SELECT user_id, is_artist, is_admin
    FROM user
    WHERE email = ${userEmail}
    `;
  return new Response(JSON.stringify(result));
}

export async function PATCH(req: Request) {
  const data: updateFormat = await req.json();

  const result = await prisma.$executeRaw`
  UPDATE user SET gender_id = ${data.gender_id}, ethnicity_id = ${data.ethnicity_id}, race_id = ${data.race_id}
  WHERE user_id = ${data.userId}
   `;

  return new Response(JSON.stringify(result));
}
