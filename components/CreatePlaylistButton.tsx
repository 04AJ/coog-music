"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";



const CreatePlaylistButton: React.FC = () => {
    const playlistModal = useCreatePlaylistModal();
    const user = useUser();
    const router = useRouter();
    if (user.userRole === 'artist' || user.userRole === 'admin') {
        return null;

    }


    const onClick = () => {
        if (!user.userId || user.userRole === 'na') {
            router.push('./login')
            return playlistModal.onClose();

        }
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