
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";

//unfinished

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const gender = await prisma.$queryRaw<User[]>`;`;
    const result = JSON.parse(JSON.stringify(gender, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};