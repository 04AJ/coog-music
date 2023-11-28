"use client"
import React, { useEffect, useState } from 'react'
import Album from './Album'
import CreateAlbumButton from './CreateAlbumButton'
import CreatePlaylistButton from './CreatePlaylistButton'
import CreatedTracks from './CreatedTracks'
import DeleteModal from './DeleteModal'
import GenreTracks from './GenreTracks'
import Header from './Header'
import LikedTracks from './LikedTracks'
import Logout from './Logout'
import Playlist from './Playlist'
import UpdateModal from './UpdateModal'
import UploadTrackButton from './UploadTrackButton'
import { Track } from '@/types'
import CreateAlbumModal from './CreateAlbumModal'
import CreatePlaylistModal from './CreatePlaylistModal'
import UploadTrackModal from './UploadTrackModal'
import usePlayer from '@/hooks/usePlayer'
import axios from 'axios'



const MainPage = () => {
    const player = usePlayer();
    const [update, setUpdate] = useState(0);
    const [tracks, setTracks] = useState<Track[]>();

    // useEffect(() => {


    //     axios
    //         .get<Track[]>(`/api/tracks`)
    //         .then((response) => {
    //             if (response.data) {
    //                 setTracks(response.data);
    //             }
    //         })
    //         .catch((error) => {
    //             alert("error fetching data");
    //         });


    // }, [update]);

    return (
        <div>
            <CreatePlaylistModal update={update} setUpdate={setUpdate} />
            <CreateAlbumModal update={update} setUpdate={setUpdate} />
            <UploadTrackModal update={update} setUpdate={setUpdate} />

            <Logout update={update} setUpdate={setUpdate} />



            <Header title="Coog Music Library" description="Welcome back"></Header>

            <div className="

">
                <div className='grid grid-row-2'>
                    <CreateAlbumButton />
                    <UploadTrackButton />

                </div>
                <CreatePlaylistButton />


            </div>



            <Playlist update={update} setUpdate={setUpdate} />
            <Album update={update} setUpdate={setUpdate} />

            <CreatedTracks update={update} setUpdate={setUpdate} />

            <LikedTracks update={update} setUpdate={setUpdate} />
            <GenreTracks update={update} setUpdate={setUpdate} />

            <UpdateModal isHomePage={true} update={update} setUpdate={setUpdate} />
            <DeleteModal isHomePage={true} update={update} setUpdate={setUpdate} />

            <div className='h-[80px]'></div>
        </div>
    )
}

export default MainPage