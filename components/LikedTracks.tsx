"use client"

import { getLikedTracks } from "@/db";
import { useUser } from "@/hooks/useUser"

const LikedTracks = () => {

    const user = useUser();

    //call api
    return (
        <div>LikedTracks</div>
    )
}

export default LikedTracks