"use client"
import { useUser } from "@/hooks/useUser";
import { Playlist, SuperUser, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistTracks from "./PlaylistTracks";

interface UserDetailsProps {
    userDetails: User | SuperUser,
    profilePage: boolean
}
const UserDetails: React.FC<UserDetailsProps> = ({
    userDetails,
    profilePage
}) => {

    const user = useUser();
    const [playlists, setPlaylists] = useState<Playlist[]>();
    const [albums, setAlbums] = useState<Playlist[]>();



    //get playlistIds or albumId's
    useEffect(() => {

        if (profilePage && user.userRole === 'listener') {
            //get playList or albumId's

            axios.get<Playlist[]>(`/api/playlist?listener_id=${user.listenerId}`)
                .then(response => {


                    if (response.data) {
                        setPlaylists(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })

        }
        else if (profilePage && user.userRole === 'artist') {


        }
        else if (!profilePage && user.activeUser.is_artist === 0) {
            //get playList or albumId's

            axios.get<Playlist[]>(`/api/playlist?listener_id=${user.activeUser.listener_id}`)
                .then(response => {



                    if (response.data) {
                        setPlaylists(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })

        }
        else {

        }

    }, [user.userId, user.listenerId, user.userRole])


    return (
        <div className="w-full flex-col">
            <div className="w-3/4 mb-10 bg-slate-800/40">


                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Username</p>
                    <p className="w-3/4 border p-1">{userDetails.user_name}</p>
                </div>

                {/* 
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Password</p>
                    <p className="w-3/4 border p-1">{userDetails.password}</p>
                </div> */}
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Email</p>
                    <p className="w-3/4 border p-1">{userDetails.email}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Gender</p>
                    <p className="w-3/4 border p-1">{userDetails.gender_name}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Race</p>
                    <p className="w-3/4 border p-1">{userDetails.race_name}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Ethnicity</p>
                    <p className="w-3/4 border p-1">{userDetails.ethnicity_name}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Birthdate</p>
                    <p className="w-3/4 border p-1">{userDetails.birth_date.toString().substring(0, 10)}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border p-1">Joined Coog Music</p>
                    <p className="w-3/4 border p-1">{userDetails.join_date.toString().substring(0, 10)}</p>
                </div>




            </div>

            {(profilePage && user.userRole === 'listener') ?
                <div>
                    <h1 className="text-3xl font-bold">
                        Playlists
                    </h1>

                    {playlists?.map((playlist) =>
                        <div key={playlist.playlist_id}>
                            <li>{playlist.playlist_name}</li>
                            <PlaylistTracks playlist_id={playlist.playlist_id} />
                        </div>
                    )}
                </div>

                : (profilePage && user.userRole === 'artist') ?


                    <h1 className="text-3xl font-bold">
                        Albums
                    </h1>
                    : (!profilePage && user.activeUser.is_artist === 0) ?
                        <div>
                            <h1 className="text-3xl font-bold">Playlists</h1>

                            {playlists?.map((playlist) =>
                                <div key={playlist.playlist_id}>
                                    <li>{playlist.playlist_name}</li>
                                    <PlaylistTracks playlist_id={playlist.playlist_id} />
                                </div>
                            )}
                        </div>

                        : <div className="text-3xl font-bold">Albums</div>







            }







        </div>

    )


}

export default UserDetails;