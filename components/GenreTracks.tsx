"use client"

import { useUser } from "@/hooks/useUser"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";
import Image from "next/image";
import usePlayer from "@/hooks/usePlayer";




const genres = [
    {
        value: 1,
        label: "hiphop"
    },
    {
        value: 2,
        label: "pop"
    },
    {
        value: 3,
        label: "country"
    },
    {
        value: 4,
        label: "rock"
    },
    {
        value: 5,
        label: "indie"
    },
    {
        value: 6,
        label: "r&b"
    },
    {
        value: 7,
        label: "jazz"
    },
    {
        value: 8,
        label: "metal"
    },
    {
        value: 9,
        label: "classical"
    },
    {
        value: 10,
        label: "funk"
    }
];
interface GenreTracksProps {
    complete_tracks: Track[],
    setUpdate: (i: number) => void;
    update: number;

}
const GenreTracks: React.FC<GenreTracksProps> = ({
    complete_tracks,
    setUpdate,
    update
}) => {

    const player = usePlayer();
    const [tracks, setTracks] = useState<Track[]>(complete_tracks);
    const [genreTracks, setgenreTracks] = useState<Track[]>();
    const [genreName, setGenreName] = useState("Complete List of tracks");
    const [all, setAll] = useState(true);
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]

    useEffect(() => {
        axios.get<Track[]>(`/api/tracks`)
            .then(response => {

                if (response.data) {
                    setTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })
    }
        , [update]);

    const handleClick = (genreId: number) => {
        axios.get<Track[]>(`/api/genreTracks?genre_id=${genreId}`)
            .then(response => {

                if (response.data) {
                    setgenreTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })
    }
    return (
        <div className="h-full mt-5"
        >

            <h1 className="text-2xl mb-2">{genreName}</h1>
            <div className="flex flex-row justify-around cursor-pointer">
                {genres.map((genre) => (
                    <div key={genre.label} className="p-2 hover:bg-red-500/90" onClick={() => { setAll(false); setGenreName("All " + genre.label + " tracks"); handleClick(genre.value) }}>{genre.label}</div>
                ))}
                <div className="p-2 hover:bg-red-500/90 " onClick={() => { setAll(true); setGenreName("Complete List of tracks") }}>all</div>
            </div>

            {(genreTracks && !all) ? <Carousel tracks={genreTracks} albums={[]} /> : <Carousel tracks={tracks} albums={[]} />}
        </div >
    )
}

export default GenreTracks;
