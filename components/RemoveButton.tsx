"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useUpdateModal } from "@/hooks/useUpdateModal.tsx";
import { CiCircleRemove } from "react-icons/ci";
import DeleteModal from "./DeleteModal";
import { useDeleteModal } from "@/hooks/useDeleteModal";

interface RemoveButtonProps {
    id: number;
    id2: number;
    type: 'track' | 'album' | 'playlist' | 'track from album' | 'track from playlist';
    name: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
    type, id, id2, name

}) => {
    const deleteModal = useDeleteModal();


    const onClick = () => {
        deleteModal.setId(id);
        deleteModal.setId2(id2)
        deleteModal.setName(name);
        deleteModal.setType(type);
        deleteModal.setIsRemove(true);
        return deleteModal.onOpen();
    }



    return (

        <div className="p-3 hover:scale-125">

            <CiCircleRemove size={30} onClick={onClick} />

        </div>




    );
}

export default RemoveButton;