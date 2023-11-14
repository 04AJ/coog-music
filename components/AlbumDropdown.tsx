import { useState } from "react";
import Dropdown from "./Dropdown";
import { Album } from "@/types";
import { AiOutlinePlus } from "react-icons/ai"
import axios from "axios";
import toast from "react-hot-toast";

interface AlbumDropdownProps {
    albums: Album[];
    track_id: number
}

const AlbumDropdown: React.FC<AlbumDropdownProps> = ({
    albums,
    track_id
}) => {

    // if (!albums) {
    //     return null;
    // }

    const handleSubmit = async (track_id: number, album_id: number) => {

        axios.post(`/api/album?track_id=${track_id}&album_id=${album_id}`)
            .then(() => {

                toast.success("Added to album!");

            })
            .catch(error => toast.error("Track already exists in album"))
    }

    return (
        <div className="flex min-h-full items-center justify-center z-100">
            <header className=" border-gray-100 p-2">
                <Dropdown>
                    <Dropdown.Button><AiOutlinePlus /></Dropdown.Button>

                    <Dropdown.Menu >
                        <p className="text-red-900">Add to album:</p>
                        {albums.map((album) =>
                            <Dropdown.MenuItem key={album.album_id} onSelect={() => handleSubmit(track_id, album.album_id)}>
                                {album.album_name}
                            </Dropdown.MenuItem>
                        )}

                    </Dropdown.Menu>
                </Dropdown>
            </header>

        </div>

    );
}

export default AlbumDropdown;