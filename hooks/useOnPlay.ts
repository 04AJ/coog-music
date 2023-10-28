import { Track } from "@/types";

import usePlayer from "./usePlayer";


const useOnPlay = (tracks: Track[]) => {
    const player = usePlayer();

    const onPlay = (id: number) => {
        player.setId(id);
        player.setIds(tracks.map((track) => track.track_id));

    }

    return onPlay;

}

export default useOnPlay