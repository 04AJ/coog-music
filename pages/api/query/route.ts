import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     //creating instance of client
//     const prisma = new PrismaClient();
//     if (req.method === 'GET') {
//         const genders = await prisma.gender.findMany();
//         return res.send(genders);
//     }
//     else if (req.method == 'POST') {
//         res.status(201).send('POST');
//     }
// }

export async function GET(req: Request) {
    const prisma = new PrismaClient();
    const genders = await prisma.$queryRaw`SELECT * FROM gender`
    console.log(genders);
    return new Response(JSON.stringify(genders))
}