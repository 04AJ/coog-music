"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useUploadTrackModal from "@/hooks/useUploadTrackModal";



const Library: React.FC = () => {
    const uploadModal = useUploadTrackModal();


    const onClick = () => {



        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Add a Track
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
          "
                />
            </div>

        </div>
    );
}

export default Library;