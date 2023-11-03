import usePlayer from '@/hooks/usePlayer';
import React from 'react'

interface Track {
    artist_id: number;
    artist_name: string;
    track_id: number;
    track_img_path: string;
    track_name: string;
    track_path: string;

};
interface PlayerContentProps {
    track: Track;
}
const PlayerContent: React.FC<PlayerContentProps> = ({
    track
}) => {

    const player = usePlayer();

    return (
        <div>

        </div>
    )
}

export default PlayerContent