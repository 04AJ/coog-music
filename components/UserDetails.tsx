"use client"
import { useUser } from "@/hooks/useUser";
import { Album, Playlist, SuperUser, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistTracks from "./PlaylistTracks";
import AlbumTracks from "./AlbumTracks";
import Image from "next/image";

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
    const [albums, setAlbums] = useState<Album[]>();



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


            axios.get<Album[]>(`/api/album?artist_id=${user.artistId}`)
                .then(response => {


                    if (response.data) {
                        setAlbums(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })




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

            axios.get<Album[]>(`/api/album?artist_id=${user.activeUser.artist_id}`)
                .then(response => {



                    if (response.data) {
                        setAlbums(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })

        }

    }, [user.userId, user.listenerId, user.userRole, profilePage, user.activeUser.is_artist, user.activeUser.listener_id])


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

                    <div>
                        <h1 className="text-3xl font-bold">
                            Albums
                        </h1>
                        {albums?.map((album) =>
                            <div key={album.album_id}>
                                <li>{album.album_name}</li>

                                <div
                                    className="
          relative 
          aspect-square 
          w-1/3
          rounded-md 
          overflow-hidden
        "
                                >
                                    <Image
                                        className="object-cover"
                                        src={album.album_cover_path}
                                        fill
                                        alt="Image"
                                    />
                                </div>
                                <AlbumTracks album_id={album.album_id} />
                            </div>
                        )}
                    </div>

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

                        :

                        <div>
                            <h1 className="text-3xl font-bold">
                                Albums
                            </h1>
                            {albums?.map((album) =>
                                <div key={album.album_id}>
                                    <li>{album.album_name}</li>
                                    <AlbumTracks album_id={album.album_id} />
                                </div>
                            )}
                        </div>





            }







        </div>

    )


}

export default UserDetails;