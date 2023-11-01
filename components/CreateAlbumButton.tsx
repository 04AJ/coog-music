"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useCreateAlbumModal from "@/hooks/useCreateAlbumModal"
import Button from "./Button";
import { useUser } from "@/hooks/useUser";



const UploadTrackButton: React.FC = () => {
    const albumModal = useCreateAlbumModal();

    const user = useUser();


    const onClick = () => {

        return albumModal.onOpen();
    }


    if (user.userRole === 'listener') {
        return null;

    }
    return (



        <div className="flex justify-center px-5 pt-4">
            <Button onClick={onClick} className="w-1/4">
                Create Album
            </Button>

        </div>


    );
}

export default UploadTrackButton;