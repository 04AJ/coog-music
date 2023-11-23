"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, SuperUser, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx"
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import AlbumTracks from "@/components/AlbumTracks";
import UpdateModal from "@/components/UpdateModal";
import UpdateButton from "@/components/UpdateButton";
import PlaylistTracks from "@/components/PlaylistTracks";
import DeleteButton from "@/components/DeleteButton";
import DeleteModal from "@/components/DeleteModal";


export default function TracksPage() {
    const user = useUser();
    const player = usePlayer();
    const router = useRouter();

    if (!user.userId) {
        router.push("/login");
    }
    const [update, setUpdate] = useState(0);

    //test if track has been liked already
    //get request
    useEffect(() => {
        //get streams


    }, [])


    return (

        <div
            className={twMerge(`
            h-fit 
        bg-gradient-to-b 
        from-indigo-800 to-30%
        p-6
          `
            )}
        >
            <UpdateModal isHomePage={false} update={update} setUpdate={setUpdate} />
            <DeleteModal isHomePage={false} update={update} setUpdate={setUpdate} />
            <div className="w-full h-full mb-4 flex-col items-center">

                <button
                    onClick={() => router.back()}
                    className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                >
                    <RxCaretLeft className="text-white" size={35} />
                </button>
                <div className="text-center mb-10">

                    <div className="text-6xl font-bold gap-2 justify-center flex flex-row mb-2">
                        {(user.activeTracksType === 'album') ?

                            <div className="flex flex-row">
                                {user.activeAlbum.album_name}
                                {(user.userRole === 'admin' || (user.activeAlbum.artist_id === user.artistId)) ?

                                    <div className="flex flex-row">
                                        <UpdateButton name={user.activeAlbum.album_name} type={"album"} genre={undefined} id={user.activeAlbum.album_id} />
                                        <DeleteButton type={"album"} id={user.activeAlbum.album_id} name={user.activeAlbum.album_name} />

                                    </div>
                                    : null
                                }

                            </div>

                            :
                            <div className="flex flex-row">
                                {user.activePlaylist.playlist_name}
                                {(user.userRole === 'admin' || (user.activePlaylist.listener_id === user.listenerId)) ?
                                    <div className="flex flex-row">
                                        <UpdateButton name={user.activePlaylist.playlist_name} type={"playlist"} genre={undefined} id={user.activePlaylist.playlist_id} />
                                        <DeleteButton type={"playlist"} id={user.activePlaylist.playlist_id} name={user.activePlaylist.playlist_name} />

                                    </div>
                                    : null
                                }

                            </div>
                        }
                    </div>
                    <div>
                        {(user.activeTracksType === 'album') ?
                            <div>Created on: {user.activeAlbum.album_created_at.toString().substring(0, 10)}</div>
                            :
                            <div>Updated on: {user.activePlaylist.playlist_updated_at.toString().substring(0, 10)}</div>

                        }
                    </div>




                </div>

                {(user.activeTracksType === 'album') ?
                    <AlbumTracks album_id={user.activeAlbum.album_id} update={update} setUpdate={setUpdate} />
                    :
                    <PlaylistTracks playlist={user.activePlaylist} update={update} setUpdate={setUpdate} />

                }

            </div >
            <div className='h-[80px]'></div>


        </div >
    )
}