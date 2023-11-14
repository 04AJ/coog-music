"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import useUpdateProfileModal from "@/hooks/useUpdateProfileModal";



const UploadProfileButton: React.FC = () => {
    const updateModal = useUpdateProfileModal();

    const user = useUser();
    const router = useRouter();


    const onClick = () => {

        return updateModal.onOpen();
    }



    return (



        <div className="flex justify-center px-5 pt-4">
            <Button onClick={onClick} className="w-1/4">
                Update
            </Button>

        </div>


    );
}

export default UploadProfileButton;