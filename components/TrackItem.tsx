"use client";

import Image from "next/image";

import { Track } from "@/types";
import PlayButton from "./PlayButton";

// import PlayButton from "./PlayButton";

interface TrackItemProps {
    data: Track;
    onClick: (id: string) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = data.track_img_path;

    return (
        <div
            // onClick={() => onClick(data.track_id)}
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
                <p className="font-semibold truncate w-full">
                    {data.track_name}
                </p>
                <p
                    className="
            text-neutral-400 
            text-sm 
            pb-2
            w-full 
            truncate
          "
                >
                    By {data.artist_name}
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
                    <audio controls src={data.track_path} className="w-full"></audio>
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
        </div>
    );
}

export default TrackItem;