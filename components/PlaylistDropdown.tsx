import { useState } from "react";
import Dropdown from "./Dropdown";
import { Playlist } from "@/types";
import { AiOutlinePlus } from "react-icons/ai"
import axios from "axios";
import toast from "react-hot-toast";

interface PlaylistDropdownProps {
    playlists: Playlist[];
    track_id: number
}

const PlaylistDropdown: React.FC<PlaylistDropdownProps> = ({
    playlists,
    track_id
}) => {

    const handleSubmit = async (track_id: number, playlist_id: number) => {

        axios.post(`/api/playlist?track_id=${track_id}&playlist_id=${playlist_id}`)
            .then(() => {

                toast.success("Added to playlist!");

            })
            .catch(error => toast.error("Track already exists in playlist"))
    }

    return (
        <div className="flex min-h-full items-center justify-center z-0">
            <header className=" border-gray-100 p-2">
                <Dropdown>
                    <Dropdown.Button><AiOutlinePlus /></Dropdown.Button>

                    <Dropdown.Menu >
                        <p className="text-red-900">Add to playlist:</p>
                        {playlists.map((playlist) =>
                            <Dropdown.MenuItem key={playlist.playlist_id} onSelect={() => handleSubmit(track_id, playlist.playlist_id)}>
                                {playlist.playlist_name}
                            </Dropdown.MenuItem>
                        )}

                    </Dropdown.Menu>
                </Dropdown>
            </header>

        </div>

    );
}

export default PlaylistDropdown;