
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";

interface updateFormat {
    user_id: number;
    archive:number
}

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');
    const tracks = await prisma.$queryRaw<User[]>`
    SELECT user_name, user_id, password, birth_date, join_date, email, race_name, gender_name, ethnicity_name 
    FROM user, ethnicity, race, gender 
    WHERE user_id = ${user_id} AND user.ethnicity_id = ethnicity.ethnicity_id 
    AND user.race_id = race.race_id AND user.gender_id = gender.gender_id;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};

export async function PATCH(req: Request) {
    const data: updateFormat = await req.json();

    const result = await prisma.$executeRaw`
    UPDATE user
    SET archive = ${data.archive}
    WHERE user_id = ${data.user_id};
    `;
    return new Response(JSON.stringify(result));
};