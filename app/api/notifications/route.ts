import prisma from '@/client'
import { NextRequest } from "next/server";
import { Notification } from "@/types";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const notifications = await prisma.$queryRaw<Notification[]>`
    SELECT n.*
    FROM notifications n
    LEFT JOIN listener_follows_artist f ON n.artist_id = f.artist_id
    WHERE n.sendAll = 1 OR (n.sendAll = 0 AND f.listener_id = ${listener_id});
    `

    
    //returns all notifications for all users
    return new Response(JSON.stringify(notifications))
};