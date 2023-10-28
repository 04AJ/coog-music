"use client";

import { Track } from "@/types";
import MediaItem from "./MediaItem";



interface SearchContentProps {
    tracks: Track[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    tracks
}) => {


    if (tracks.length === 0) {
        return (
            <div
                className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
            >
                No songs found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {tracks.map((track: Track) => (
                <div
                    key={track.track_id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem
                            onClick={() => { }}
                            data={track}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchContent;