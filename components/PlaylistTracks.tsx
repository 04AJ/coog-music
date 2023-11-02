"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";


interface PlaylistTrackProps {
    playlist_id: number;
}
const PlaylistTracks: React.FC<PlaylistTrackProps> = ({
    playlist_id
}) => {


    const [playlistTracks, setPlaylistTracks] = useState<Track[]>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //consume likedTracks api endpoint
    useEffect(() => {
        axios.get<Track[]>(`/api/playlistTracks?playlist_id=${playlist_id}`)
            .then(response => {

                if (response.data) {
                    setPlaylistTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

    }, [playlist_id]);


    return (
        <div >
            {playlistTracks ? <Carousel tracks={playlistTracks} albums={[]} /> : null}
        </div>
    )
}

export default PlaylistTracks;
