"use client"

import { getLikedTracks } from "@/db";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";



const CreatedTracks = () => {
    const user = useUser();
    const router = useRouter();

    const [createdTracks, setCreatedTracks] = useState<Track[]>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]

    if (user.userRole !== 'artist') {
        return null;
    }

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






    return (
        <div >
            Your Tracks
            {createdTracks ? <Carousel tracks={createdTracks} /> : null}
        </div>
    )


}

export default CreatedTracks;
