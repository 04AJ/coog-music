"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";
import Image from "next/image";
import MediaItem from "./MediaItem";
import PlaylistDropdown from "./PlaylistDropdown";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import RemoveButton from "./RemoveButton";



interface AlbumTracksProps {
    album_id: number;
    setUpdate: (i: number) => void;
    update: number;
}
const AlbumTracks: React.FC<AlbumTracksProps> = ({
    album_id,
    setUpdate,
    update
}) => {


    const [albumTracks, setAlbumTracks] = useState<Track[]>();
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]

    const user = useUser();
    const onPlay = useOnPlay((albumTracks) ? albumTracks : []);
    const player = usePlayer();
    let count = 1;

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

    }, [album_id, update]);
    if (albumTracks?.length === 0) {
        return (
            <p className="mt-4 text-neutral-400">No tracks available. <br />
                To add tracks to your album, go the Home page and click the + button next to tracks you want to add to this album.</p >
        )
    };


    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {(albumTracks) ?
                albumTracks.map((track: Track) => (
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
                        {(user.userRole === 'admin' || (user.artistId === track.artist_id)) ?
                            <RemoveButton id={track.track_id} id2={album_id} type={'track from album'} name={track.track_name} />
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

export default AlbumTracks;
