import prisma from '@/client'
import { NextRequest } from "next/server";
import { Notification } from "@/types";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const isAdmin = searchParams.get('isAdmin');
    const isArtist = searchParams.get('isArtist');
    let notifications;
    if (isAdmin) {
        notifications = await prisma.$queryRaw<Notification[]>`
        SELECT DISTINCT n.*
        FROM notifications n
        LEFT JOIN listener_follows_artists f ON n.artist_id = f.artist_id;
        `
    }
    else if (isArtist) {
        notifications = await prisma.$queryRaw<Notification[]>`
        SELECT DISTINCT n.*
        FROM notifications n
        LEFT JOIN listener_follows_artists f ON n.artist_id = f.artist_id
        WHERE n.sendAll=1;
        `
    }
    else {
        notifications = await prisma.$queryRaw<Notification[]>`
        SELECT DISTINCT n.*
        FROM notifications n
        LEFT JOIN listener_follows_artists f ON n.artist_id = f.artist_id
        WHERE n.sendAll = 1 OR (n.sendAll = 0 AND f.listener_id = ${listener_id});
        `
    }


    //returns all notifications for all users
    return new Response(JSON.stringify(notifications))
};


export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const NotificationID = searchParams.get('NotificationID');
    const affected = await prisma.$executeRaw`DELETE FROM notifications WHERE NotificationID = ${NotificationID}`
    console.log(affected)
    return new Response(JSON.stringify(affected));
}