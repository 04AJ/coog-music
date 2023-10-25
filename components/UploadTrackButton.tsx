"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useUploadTrackModal from "@/hooks/useUploadTrackModal";
import Button from "./Button";



const UploadTrackButton: React.FC = () => {
    const uploadModal = useUploadTrackModal();


    const onClick = () => {

        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <Button onClick={onClick}>
                    Upload Track
                </Button>

            </div>

        </div>
    );
}

export default UploadTrackButton;