import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

export async function POST(req: Request) {
    const prisma = new PrismaClient();
    const result = await prisma.$executeRaw`INSERT INTO ethnicity (ethnicity_name) VALUES ('african american')`;
    console.log(result);
    return new Response(JSON.stringify(result))
}