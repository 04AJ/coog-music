import primsa from '@/client'
import { NextRequest } from 'next/server'


interface resFormat {
    email_id: number;
    artist_name: string;
    listener_email: string;
    message_subject: string;
    message_body: string
}

export async function GET(req: NextRequest){
    const emails: resFormat[] = await primsa.$queryRaw`SELECT * FROM email_queue`
    return new Response(JSON.stringify(emails));
}