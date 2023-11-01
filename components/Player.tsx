"use client";

import { getTrackById } from "@/db";
import useGetTrackById from "@/hooks/useGetTrackById";
import usePlayer from "@/hooks/usePlayer";
import axios from 'axios';
import { error } from "console";
import { useEffect, useState } from "react";
import PlayerContent from "./PlayerContent";
import { Track } from "@/types";
import Header from "./Header";


const Player = () => {
    const player = usePlayer();
    const [track, setTrack] = useState<Track>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //FIXED STATE ERROR - NOTE prisma always returns array
    useEffect(() => {
        axios.get<Track[]>(`/api/query?track_id=${player.activeId}`)
            .then(response => {

                if (response.data) {
                    setTrack(response.data[0]);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

    }, [player.activeId]);

    // console.log(track?.track_name);

    if (!track || !player.activeId) {
        return null;
    }


    return (
        <div
            className="
            
            z-50
            fixed 
            bottom-0 
            bg-black 
            w-full 
            py-2 
            h-[80px] 
          "
        >
            <p className="
            font-semibold
            bottom-10
            left-10 
            fixed
            text-xl
            self-start
            ">{track.track_name}</p>

            <p className="
            font-light
            bottom-5
            left-10 
            fixed
            text-base
            self-start
            text-red-400
            ">{track.artist_name}</p>


            <div className="
            flex
            justify-center
            ">


                <audio autoPlay controls src={player.trackPath}></audio>

            </div>


        </div >
    );


}

export default Player;