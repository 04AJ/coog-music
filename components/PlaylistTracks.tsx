"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Playlist, Track } from "@/types";
import Carousel from "./Carousel";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import RemoveButton from "./RemoveButton";


interface PlaylistTrackProps {
    playlist: Playlist;
    setUpdate: (i: number) => void;
    update: number;
}
const PlaylistTracks: React.FC<PlaylistTrackProps> = ({
    playlist,
    setUpdate,
    update
}) => {


    const [playlistTracks, setPlaylistTracks] = useState<Track[]>();
    const user = useUser();
    const onPlay = useOnPlay((playlistTracks) ? playlistTracks : []);
    const player = usePlayer();
    let count = 1;

    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


    //consume likedTracks api endpoint
    useEffect(() => {
        axios.get<Track[]>(`/api/playlistTracks?playlist_id=${playlist.playlist_id}`)
            .then(response => {

                if (response.data) {
                    setPlaylistTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

    }, [playlist.playlist_id, update]);

    if (playlistTracks?.length === 0) {
        return (
            <p className="mt-4 text-neutral-400">No tracks available. <br />
                To add tracks to your playlist, go the Search page and click the + button next to tracks you want to add to this playlist.</p >
        )
    };


    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {(playlistTracks) ?
                playlistTracks.map((track: Track) => (
                    <div
                        key={track.track_id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div>{count++}</div>

                        <div className="flex-1 flex-row">
                            <MediaItem
                                onClick={(id: number) => { onPlay(id); player.setPath(track.track_path) }}
                                data={track}
                            />
                        </div>
                        {(user.userRole === 'admin' || (user.listenerId === playlist.listener_id)) ?
                            <RemoveButton id={track.track_id} id2={playlist.playlist_id} type={'track from playlist'} name={track.track_name} />
                            :

                            <LikeButton trackId={track.track_id} />


                        }
                    </div>
                ))
                :
                null
            }
        </div>
    )
}

export default PlaylistTracks;
