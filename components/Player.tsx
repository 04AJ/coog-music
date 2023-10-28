"use client";

import { getTrackById } from "@/db";
import useGetTrackById from "@/hooks/useGetTrackById";
import usePlayer from "@/hooks/usePlayer";
import { Track } from "@/types";


const Player = () => {
    const player = usePlayer();
    // const { track } = useGetTrackById(player.activeId);

    // if (!track || !player.activeId) {
    //     return null;
    // }

    return (
        <div
            className="
            fixed 
            bottom-0 
            bg-black 
            w-full 
            py-2 
            h-[80px] 
            px-4
          "
        >
            Player!
        </div>
    );

    //CANNOT CALL PRISMA CLIENT (SERVER SIDE COMPONENT) IN CLIENT SIDE COMPONENT
    // const track = getTrackById(player.activeId);



}

export default Player;