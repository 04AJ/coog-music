import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Track } from "@/types";
import prisma from "@/client";

const useGetTrackById = (id?: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [track, setTrack] = useState<Track | undefined>(undefined);

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchSong = async () => {
            const track = await prisma.$queryRaw`SELECT track_id, track_name, track_path, track_img_path, artist.artist_id, artist_name FROM track, artist WHERE track.artist_id = artist.artist_id AND track_id = ${id};`


            setTrack(track as Track);
            setIsLoading(false);
        }

        fetchSong();
    }, [id]);

    return useMemo(() => ({
        isLoading,
        track
    }), [isLoading, track]);
};

export default useGetTrackById;