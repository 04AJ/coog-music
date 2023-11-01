"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import { useUser } from "@/hooks/useUser";



const CreatePlaylistButton: React.FC = () => {
    const playlistModal = useCreatePlaylistModal();
    const user = useUser();

    if (user.userRole === 'artist') {
        return null;

    }


    const onClick = () => {

        return playlistModal.onOpen();
    }

    return (

        <div className="flex justify-center px-5 pt-4">
            <Button onClick={onClick} className="w-1/4">
                Create Playlist            </Button>

        </div>


    );
}

export default CreatePlaylistButton;