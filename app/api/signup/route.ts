import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/client";

interface reqFormat {
  role: string;
  email: string;
  password: string;
  race: string;
  ethnicity: string;
  gender: string;
}

export async function POST(req: reqFormat) {
  const data: reqFormat = req;
  let curDate = new Date();

  const result = await prisma.$executeRaw`
    INSERT INTO user (user_name,password,birth_date,join_date,email,ethnicity_id,gender_id)
    VALUES ('myusername1234','mypassword','2001-01-02','2001-01-02','testuser2@icloud.com',1,1)
    `;

  return new Response(JSON.stringify("cruz"));
}

export async function GET() {
  //WIP
  const result = await prisma.$queryRaw`
    SELECT user_id
    FROM user
    WHERE 
    `;
}
