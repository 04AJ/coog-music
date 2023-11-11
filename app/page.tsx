
import Image from 'next/image'
import mysql, { ConnectionOptions, RowDataPacket } from 'mysql2';
import Link from 'next/link';
import Library from '@/components/Library';
import { toast, Toaster } from "react-hot-toast";
import UploadTrackButton from '@/components/UploadTrackButton';
import Header from '@/components/Header';
import { getTracks, getArtistFollowersEmails } from '@/db'
import Carousel from '@/components/Carousel';
import LikedTracks from '@/components/LikedTracks';
import CreatePlaylistButton from '@/components/CreatePlaylistButton';
import PlaylistDropdown from '@/components/PlaylistDropdown';
import CreateAlbumButton from '@/components/CreateAlbumButton';
import CreatedTracks from '@/components/CreatedTracks';
import Logout from '@/components/Logout';
import GenreTracks from '@/components/GenreTracks';

//this means page will not be cached
export const revalidate = 0;



export default async function Home() {

  const tracks = await getTracks();



  return (
    <div className="p-5 bg-neutral-900/80 flex min-h-screen flex-col before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-red-900 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <div><Toaster /></div>
      <Logout />

      <Header title="Coog Music Library" description="Welcome back"></Header>

      <div className="
      
      ">
        <div className='grid grid-row-2'>
          <CreateAlbumButton />
          <UploadTrackButton />

        </div>
        <CreatePlaylistButton />


      </div>

      <CreatedTracks />
      <LikedTracks />
      <GenreTracks complete_tracks={tracks} />



    </div >


  )


}
