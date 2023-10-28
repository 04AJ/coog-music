import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { Track } from "@/types";
import prisma from '@/client'

interface reqFormat {
    id: number;
}


export async function GET(req: Request) {
    // const data: reqFormat = await req.json();
    const tracks = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))




    // return new Response((tracks as any) || [])
};