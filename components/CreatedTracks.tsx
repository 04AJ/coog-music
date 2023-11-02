"use client"

import { getLikedTracks } from "@/db";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Album, Track } from "@/types";
import Carousel from "./Carousel";



const CreatedTracks = () => {
    const user = useUser();
    const router = useRouter();

    const [createdTracks, setCreatedTracks] = useState<Track[]>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]



    //consume likedTracks api endpoint
    useEffect(() => {
        if (user.userRole === 'artist') {
            axios.get<Track[]>(`/api/createdTracks?artist_id=${user.artistId}`)
                .then(response => {

                    if (response.data) {
                        setCreatedTracks(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }

    }, [user.userId, user.userRole]);


    const [albums, setAlbums] = useState<Album[]>();

    useEffect(() => {

        if (user.userRole === 'artist') {
            //get playList or albumId's

            axios.get<Album[]>(`/api/album?artist_id=${user.artistId}`)
                .then(response => {


                    if (response.data) {
                        setAlbums(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })

        }

    }, [user.userId, user.artistId, user.userRole])

    console.log(albums);

    return (
        <div >
            {(user.userRole === 'artist') ?
                " Your Tracks" :
                ""

            }
            {(createdTracks && albums) ? <Carousel tracks={createdTracks} albums={albums} /> : null}
        </div>
    )


}

export default CreatedTracks;
