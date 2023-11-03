import { Track } from "@/types";

import usePlayer from "./usePlayer";
import { useUser } from "./useUser";


const useOnPlay = (tracks: Track[]) => {
    const player = usePlayer();
    const user = useUser();

    const onPlay = (id: number) => {
        // if (!user) {
        //     return null;
        // }
        player.setId(id);
        player.setIds(tracks.map((track) => track.track_id));

    }

    return onPlay;

}

export default useOnPlay