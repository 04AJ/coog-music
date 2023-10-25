'use client'

import Image from 'next/image'
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';
import Link from 'next/link';
import useUploadTrackModal from '@/hooks/useUploadTrackModal';
import Library from '@/components/Library';
import { toast, Toaster } from "react-hot-toast";
import UploadTrackButton from '@/components/UploadTrackButton';
import Header from '@/components/Header';


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
    toast.success("testing");
    await fetch('/api/query', {
      method: 'GET'
    })
  }


  return (
    <div className="bg-neutral-900/80 flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <div><Toaster /></div>


      <Header
        title="Coog Music Library" description="Welcome back"
      >
      </Header>


      {/* <button className="border p-2 hover:bg-red-700"
        onClick={makeApiCall}>GET Request</button>

      <div className='border p-2'>
        <Link href='/upload-btn'>Upload Images</Link>
      </div>

      <div className='border p-2'>
        <Link href='/upload-audio-btn'>Upload Audio</Link>
      </div> */}

      <UploadTrackButton />


    </div >
  )
}
