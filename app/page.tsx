'use client'

import Image from 'next/image'
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';
import Link from 'next/link';
import useUploadTrackModal from '@/hooks/useUploadTrackModal';
import Library from '@/components/Library';


/*
Won't need this for prisma
const access: ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
};

const conn = mysql.createConnection(access);


conn.query<RowDataPacket[]>('SELECT * FROM GENDER;', (_err, rows) => {
  console.log(rows);
});

*/



export default function Home() {

  const uploadModal = useUploadTrackModal();
  const makeApiCall = async () => {
    await fetch('/api/query', {
      method: 'GET'
    })
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-700 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        Coog Music Home
      </div>
      {/* <div>
        Testing audio
        <audio controls src="https://utfs.io/f/ed52bb5e-4bd6-4f1c-9016-c30b5a80a955-i9eury.mp3" />

      </div> */}

      <button className="border p-2 hover:bg-red-700"
        onClick={makeApiCall}>GET Request</button>

      <div className='border p-2'>
        <Link href='/upload-btn'>Upload Images</Link>
      </div>

      <div className='border p-2'>
        <Link href='/upload-audio-btn'>Upload Audio</Link>
      </div>

      <Library />


    </main >
  )
}
