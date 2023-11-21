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
import UploadTrackModal from './UploadTrackModal'
import SearchContent from './SearchContent'
import SearchInput from './SearchInput'

interface MainPageProps {
    tracks: Track[]
}

const MainPage: React.FC<MainPageProps> = ({
    tracks
}) => {

    const [update, setUpdate] = useState(0);

    return (
        <div>
            <UpdateModal isHomePage={false} update={update} setUpdate={setUpdate} />
            <DeleteModal isHomePage={false} update={update} setUpdate={setUpdate} />

            <div className="p-5 bg-neutral-900/80">
                <div className="pb-10">
                    <Header title="Search" description="Find your favorite tracks here"></Header>

                </div>
                <div className="w-full">

                    <div className="mb-5">
                        <SearchInput update={update} setUpdate={setUpdate} />

                    </div>

                    <SearchContent tracks={tracks} />

                </div>

            </div>
        </div>
    )
}

export default MainPage