import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { Track } from "@/types";


export async function GET(req: Request) {
    const prisma = new PrismaClient();
    const tracks = await prisma.$queryRaw`SELECT track_name, track_path, track_img_path, artist_id FROM track`
    console.log(tracks);
    return new Response(JSON.stringify(tracks))
}