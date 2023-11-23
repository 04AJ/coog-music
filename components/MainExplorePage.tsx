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
import { SuperUser, Track } from '@/types'
import CreateAlbumModal from './CreateAlbumModal'
import CreatePlaylistModal from './CreatePlaylistModal'
import UploadTrackModal from './UploadTrackModal'
import SearchContent from './SearchContent'
import SearchInput from './SearchInput'
import UserSearchContent from './UserSearchContent'
import UserSearchInput from './UserSearchInput'

interface MainPageProps {
    listeners: SuperUser[],
    artists: SuperUser[]

}

const MainExplorePage: React.FC<MainPageProps> = ({
    listeners, artists
}) => {

    const [update, setUpdate] = useState(0);

    return (
        <div>
            <DeleteModal isHomePage={false} update={update} setUpdate={setUpdate} />

            <div className="p-5 bg-neutral-900/80 ">
                <div className="pb-10">
                    <Header title="Explore" description="Find your favorite artists and listeners here"></Header>

                </div>
                <div className="z-50 w-full">
                    <div className="mb-5">
                        <UserSearchInput />
                    </div>

                    <UserSearchContent artists={artists} listeners={listeners} />


                </div>

            </div>
            <div className='h-[80px]'></div>

        </div>
    )
}

export default MainExplorePage