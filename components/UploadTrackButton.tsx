"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useUploadTrackModal from "@/hooks/useUploadTrackModal";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";



const UploadTrackButton: React.FC = () => {
    const uploadModal = useUploadTrackModal();

    const user = useUser();
    const router = useRouter();


    const onClick = () => {
        if (!user.userId || user.userRole === 'na') {
            router.push('./login')
            return uploadModal.onClose();

        }

        return uploadModal.onOpen();
    }


    if (user.userRole === 'listener' || user.userRole === 'admin') {
        return null;

    }
    return (



        <div className="flex justify-center px-5 pt-4">
            <Button onClick={onClick} className="w-1/4">
                Upload Track
            </Button>

        </div>


    );
}

export default UploadTrackButton;