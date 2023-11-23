"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Album, Playlist, Track } from "@/types";
import Carousel from "./Carousel";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import RemoveButton from "./RemoveButton";

interface albumRequest {
    setUpdate: (i: number) => void;
    update: number;
}

const Album: React.FC<albumRequest> = ({
    setUpdate, update
}) => {


    const [albums, setAlbums] = useState<Album[]>();
    const user = useUser();
    const router = useRouter();


    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //consume playlists api endpoint
    useEffect(() => {

        axios.get<Album[]>(`/api/album?artist_id=${user.artistId}`)
            .then(response => {


                if (response.data) {
                    setAlbums(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })


    }, [user.artistId, update]);

    if (user.userRole !== 'artist') {
        return null;
    }

    if (albums?.length === 0) {
        return (
            <div>
                <h1 className="text-2xl mb-2">
                    Your Albums
                </h1>
                <div className="mt-4 text-neutral-400">No albums available.</div>
            </div>

        )


    };


    return (
        <div className="flex flex-col mt-5">
            <h1 className="text-2xl mb-2">
                Your Albums
            </h1>
            <div className="flex flex-row">
                {albums?.map((album) =>
                    <div key={album.album_id}>

                        <div className="p-3 border rounded w-fit cursor-pointer mr-2 hover:bg-red-500"
                            onClick={() => { user.setActiveAlbum(album); user.setActiveTracksType('album'); router.push('/tracks') }}
                        >
                            {album.album_name}</div>

                        {/* <PlaylistTracks playlist_id={playlist.playlist_id} /> */}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Album;

