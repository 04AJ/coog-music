"use client";

import Image from "next/image";

import { Album, Track } from "@/types";
import PlayButton from "./PlayButton";
import AlbumDropdown from "./AlbumDropdown";
import { useUser } from "@/hooks/useUser";


interface AlbumItemProps {
    data: Album;
}

const AlbumItem: React.FC<AlbumItemProps> = ({
    data
}) => {
    const imagePath = data.album_cover_path;
    const user = useUser();
    return (
        <div
            className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
        >
            <div
                className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
            >
                <Image
                    className="object-cover"
                    src={imagePath || '/images/music-placeholder.png'}
                    fill
                    alt="Image"
                />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-xl font-semibold truncate w-full">
                    {data.album_name}
                </p>

                <div
                    className="
            text-neutral-400 
            text-sm 
            pb-2 
            w-full 
            truncate
          "
                >
                </div>
            </div>
            <div
                className="
          absolute 
          bottom-24 
          right-5
        "
            >
                <PlayButton />
            </div>



        </div >
    );
}

export default AlbumItem;