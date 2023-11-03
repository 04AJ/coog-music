
import prisma from '@/client'
import { SuperUser } from '@/types';
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const listener_id = searchParams.get('listener_id');
    const artist_id = searchParams.get('artist_id');

    if (listener_id) {
        const users = await prisma.$queryRaw<SuperUser>`
        SELECT user.user_id, user_name, birth_date, join_date, email, race_name, ethnicity_name, gender_name, listener.listener_id, is_artist, is_admin
        FROM user, listener, race, ethnicity, gender, listener_follows_listener
        WHERE ${listener_id} = listener_follows_listener.listener_id AND listener_follows_listener.follower_id = listener.listener_id AND (user.user_id = listener.user_id )
        AND user.gender_id = gender.gender_id AND user.ethnicity_id = ethnicity.ethnicity_id AND user.race_id = race.race_id`;

        // console.log(users);
        return new Response(JSON.stringify(users))

    }
    else {
        const users = await prisma.$queryRaw<SuperUser>`
        SELECT user.user_id, user_name, birth_date, join_date, email, race_name, ethnicity_name, gender_name, listener.listener_id, is_artist, is_admin
        FROM user, listener, race, ethnicity, gender, listener_follows_artists
        WHERE ${artist_id} = listener_follows_artists.artist_id AND listener_follows_artists.listener_id = listener.listener_id AND (user.user_id = listener.user_id )
        AND user.gender_id = gender.gender_id AND user.ethnicity_id = ethnicity.ethnicity_id AND user.race_id = race.race_id`
        return new Response(JSON.stringify(users))

    }

    // console.log(tracks);
    return new Response(JSON.stringify("users"))

};