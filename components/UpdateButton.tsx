"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useUpdateModal } from "@/hooks/useUpdateModal.tsx";
import { GoPencil } from "react-icons/go";
import UpdateModal from "./UpdateModal";


interface UpdateModalProps {
    name: string;
    id: number;
    type: 'track' | 'album' | 'playlist';
    genre: number | undefined
}

const UpdateButton: React.FC<UpdateModalProps> = ({
    name, type, genre, id

}) => {
    const updateModal = useUpdateModal();



    const onClick = () => {
        updateModal.setId(id);
        updateModal.setName(name);
        updateModal.setType(type);
        updateModal.setGenre(genre);
        return updateModal.onOpen();
    }



    return (

        <div className="p-3 hover:scale-125">

            <GoPencil size={20} onClick={onClick} />

        </div>




    );
}

export default UpdateButton;