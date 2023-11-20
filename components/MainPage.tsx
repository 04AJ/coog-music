"use client"
import React, { useState } from 'react'
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

interface MainPageProps {
    tracks: Track[]
}

const MainPage: React.FC<MainPageProps> = ({
    tracks
}) => {

    const [update, setUpdate] = useState(0);

    return (
        <div>
            <CreatePlaylistModal update={update} setUpdate={setUpdate} />
            <CreateAlbumModal />
            State: {update}
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



            <Playlist update={update} setUpdate={setUpdate} />
            <Album />

            <CreatedTracks />

            <LikedTracks />
            <GenreTracks complete_tracks={tracks} />
            <UpdateModal isHomePage={true} />
            <DeleteModal isHomePage={true} />


        </div>
    )
}

export default MainPage