"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useCreateAlbumModal from "@/hooks/useCreateAlbumModal"
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";



const UploadTrackButton: React.FC = () => {
    const albumModal = useCreateAlbumModal();
    const router = useRouter();
    const user = useUser();


    const onClick = () => {

        if (!user.userId || user.userRole === 'na') {
            router.push('./login')
            return albumModal.onClose();

        }

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