
import prisma from '@/client'
import { NextRequest } from "next/server";


//UPDATE users SET login_count = login_count + 1 WHERE id = 1;


export async function GET(req: NextRequest) {
    const tracks = await prisma.$queryRaw`
    SELECT track_id, genre_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
    FROM track, artist 
    WHERE track.artist_id = artist.artist_id AND (track.archive != 1);`
    return new Response(JSON.stringify(tracks));



};
