import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

import { Track } from "@/types";

const getTracks = async (): Promise<Track[]> => {
    const prisma = new PrismaClient();
    const tracks = await prisma.$queryRaw`SELECT track_name, track_path, track_img_path, artist_id FROM track`
    // console.log(tracks);
    // return new Response(JSON.stringify(tracks))



    return (tracks as any) || [];
};

export default getTracks;