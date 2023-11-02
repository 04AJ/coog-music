"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";
import Image from "next/image";



interface AlbumTracksProps {
    album_id: number;
}
const AlbumTracks: React.FC<AlbumTracksProps> = ({
    album_id
}) => {


    const [albumTracks, setAlbumTracks] = useState<Track[]>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //consume likedTracks api endpoint
    useEffect(() => {
        axios.get<Track[]>(`/api/albumTracks?album_id=${album_id}`)
            .then(response => {

                if (response.data) {
                    setAlbumTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

    }, [album_id]);


    return (
        <div>
            {albumTracks ? <Carousel tracks={albumTracks} albums={[]} /> : null}
        </div>
    )
}

export default AlbumTracks;
