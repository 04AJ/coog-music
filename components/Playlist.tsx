"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Playlist, Track } from "@/types";
import Carousel from "./Carousel";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import RemoveButton from "./RemoveButton";



const Playlist = () => {


    const [playlists, setPlaylists] = useState<Playlist[]>();
    const user = useUser();
    const router = useRouter();


    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //consume playlists api endpoint
    useEffect(() => {
        axios.get<Playlist[]>(`/api/playlist?listener_id=${user.listenerId}`)
            .then(response => {


                if (response.data) {
                    setPlaylists(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })


    }, [user.listenerId]);

    if (user.userRole !== 'listener') {
        return null;
    }
    if (playlists?.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">No playlists available.</div>
        )
    };


    return (
        <div className="flex flex-col mt-5">
            <h1 className="text-2xl mb-2">
                Your Playlists
            </h1>
            <div className="flex flex-row">
                {playlists?.map((playlist) =>
                    <div key={playlist.playlist_id}>

                        <div className="p-3 border rounded w-fit cursor-pointer mr-2 hover:bg-red-500"
                            onClick={() => { user.setActivePlaylist(playlist); user.setActiveTracksType('playlist'); router.push('/tracks') }}
                        >
                            {playlist.playlist_name}</div>

                        {/* <PlaylistTracks playlist_id={playlist.playlist_id} /> */}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Playlist;

