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

    setUpdate: (i: number) => void;
    update: number;

}
const GenreTracks: React.FC<GenreTracksProps> = ({

    setUpdate,
    update
}) => {

    const player = usePlayer();
    // const [tracks, setTracks] = useState<Track[]>();
    const [genreTracks, setgenreTracks] = useState<Track[]>();
    const [genreName, setGenreName] = useState("Complete List of tracks");
    const [all, setAll] = useState(true);
    //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]

    useEffect(() => {
        axios.get<Track[]>(`/api/genreTracks?genre_id=0&all=1`)
            .then(response => {

                if (response.data) {
                    console.log(response.data);
                    setgenreTracks(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })
    }
        , []);

    const handleClick = (genreId: number, showAll: boolean) => {

        if (showAll) {
            axios.get<Track[]>(`/api/genreTracks?genre_id=0&all=1`)
                .then(response => {

                    if (response.data) {
                        // console.log(response.data);
                        setgenreTracks(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }
        else {
            axios.get<Track[]>(`/api/genreTracks?genre_id=${genreId}&all=0`)
                .then(response => {

                    if (response.data) {
                        setgenreTracks(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }


    }
    return (
        <div className="h-full mt-5"
        >

            <h1 className="text-2xl mb-2">{genreName}</h1>
            <div className="flex flex-row justify-around cursor-pointer">
                {genres.map((genre) => (
                    <div key={genre.label} className="p-2 hover:bg-red-500/90" onClick={() => { setAll(false); setGenreName("All " + genre.label + " tracks"); handleClick(genre.value, false) }}>{genre.label}</div>
                ))}
                <div className="p-2 hover:bg-red-500/90 " onClick={() => { setAll(true); setGenreName("Complete List of tracks"); handleClick(0, true); setUpdate(update + 1) }}>all</div>
            </div>

            {(genreTracks && !all) ? <Carousel tracks={genreTracks} albums={[]} /> : (genreTracks) ? <Carousel tracks={genreTracks} albums={[]} /> : null}
        </div >
    )
}

export default GenreTracks;
