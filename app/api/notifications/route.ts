import prisma from '@/client'
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    // const searchParams = req.nextUrl.searchParams;
    // const listener_id = searchParams.get('listener_id');
    const notifications = await prisma.$queryRaw`
    SELECT arts.artist_name as artist_name, n.NotificationID as n_id, n.Notification_time as n_time, n.Message 
    FROM notifications as n
    JOIN artist as arts on n.artist_id = arts.artist_id
    WHERE n.artist_id = arts.artist_id
    AND n.sendAll = 1;
    `
    //returns all notifications for all users
    return new Response(JSON.stringify(notifications))
};