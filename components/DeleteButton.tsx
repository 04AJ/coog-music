"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useUpdateModal } from "@/hooks/useUpdateModal.tsx";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "./DeleteModal";
import { useDeleteModal } from "@/hooks/useDeleteModal";

interface DeleteButtonProps {
    id: number;
    type: 'track' | 'album' | 'playlist' | 'track from album' | 'track from playlist';
    name: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    type, id, name

}) => {
    const deleteModal = useDeleteModal();


    const onClick = () => {
        deleteModal.setId(id);
        deleteModal.setName(name);
        deleteModal.setType(type);
        deleteModal.setIsRemove(false);
        return deleteModal.onOpen();
    }



    return (

        <div className="p-3 hover:scale-125">

            <AiOutlineDelete size={20} onClick={onClick} />

        </div>




    );
}

export default DeleteButton;