"use client";

import Image from "next/image";

import { Track } from "@/types";

interface MediaItemProps {
    data: Track;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick,
}) => {
    const imageUrl = data.track_img_path;

    // const handleClick = () => {
    //     if (onClick) {
    //         return onClick(data.track_id);
    //     }

    //     return player.setId(data.track_id);
    // };

    return (
        <div
            onClick={() => { }}
            className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
        >
            <div
                className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
            >
                <Image
                    fill
                    src={imageUrl}
                    alt="MediaItem"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.track_name}</p>
                <p className="text-neutral-400 text-sm truncate">
                    By {data.artist_name}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;