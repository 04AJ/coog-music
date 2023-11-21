"use client"
import { useUser } from "@/hooks/useUser";
import { Album, Playlist, SuperUser, Track, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaylistTracks from "./PlaylistTracks";
import AlbumTracks from "./AlbumTracks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AlbumItem from "./AlbumItem";
import { useUpdateModal } from "@/hooks/useUpdateModal.tsx";
import { useDeleteModal } from "@/hooks/useDeleteModal";
import Carousel from "./Carousel";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

interface UserDetailsProps {
    userDetails: User | SuperUser,
    profilePage: boolean,
    setUpdate: (i: number) => void,
    update: number
}
const UserDetails: React.FC<UserDetailsProps> = ({
    userDetails,
    profilePage,
    setUpdate,
    update
}) => {

    const user = useUser();
    const updateModal = useUpdateModal();
    const deleteModal = useDeleteModal();

    const [playlists, setPlaylists] = useState<Playlist[]>();
    const [albums, setAlbums] = useState<Album[]>();
    const [tracks, setTracks] = useState<Track[]>();
    const router = useRouter();


    //get playlistIds or albumId's
    useEffect(() => {
        if (user.userRole === 'admin') {
            updateModal.setIsAdmin(true);
            deleteModal.setIsAdmin(true);
        }
        else {
            updateModal.setIsAdmin(false);
            deleteModal.setIsAdmin(false);

        }

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
            axios.get<Track[]>(`/api/singles?artist_id=${user.artistId}`)
                .then(response => {


                    if (response.data) {
                        setTracks(response.data);
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

            axios.get<Track[]>(`/api/singles?artist_id=${user.activeUser.artist_id}`)
                .then(response => {


                    if (response.data) {
                        setTracks(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })


        }

    }, [user.userId, user.listenerId, user.userRole, profilePage, user.activeUser.is_artist, user.activeUser.listener_id, update])


    return (
        <div className="w-full flex-col">
            <UpdateModal isHomePage={false} update={update} setUpdate={setUpdate} />
            <DeleteModal isHomePage={false} update={update} setUpdate={setUpdate} />
            <div className="flex-col mb-10 w-3/4 bg-slate-800/40">


                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Username</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.user_name}</p>
                </div>


                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Email</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.email}</p>
                </div>
                {(user.userRole === 'admin') ?
                    <div className="flex flex-row">
                        <p className="w-1/4 border rounded p-1">Password</p>
                        <p className="w-3/4 border rounded p-1">{userDetails.password}</p>
                    </div>
                    : null
                }
                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Gender</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.gender_name}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Race</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.race_name.toLowerCase()}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Ethnicity</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.ethnicity_name}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Birthdate</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.birth_date.toString().substring(0, 10)}</p>
                </div>
                <div className="flex flex-row">
                    <p className="w-1/4 border rounded p-1">Joined Coog Music</p>
                    <p className="w-3/4 border rounded p-1">{userDetails.join_date.toString().substring(0, 10)}</p>
                </div>




            </div>

            {(profilePage && user.userRole === 'listener') ?
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Playlists
                    </h1>
                    <div className="flex flex-row">
                        {playlists?.map((playlist) =>
                            <div key={playlist.playlist_id}>

                                <div className="p-3 border rounded w-fit cursor-pointer mr-2 hover:bg-red-500"
                                    onClick={() => { user.setActivePlaylist(playlist); user.setActiveTracksType('playlist'); router.push('/tracks') }}
                                >
                                    {playlist.playlist_name}</div>

                                {/* <PlaylistTracks playlist_id={playlist.playlist_id} /> */}
                            </div>
                        )}
                    </div>

                </div>

                : (profilePage && user.userRole === 'artist') ?

                    <div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Singles
                            </h1>
                            {(tracks) ?
                                <div>

                                    <Carousel tracks={tracks} albums={[]} />

                                </div> : "No tracks avaialable."}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Albums
                            </h1>

                            <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-3 
                        xl:grid-cols-4 
                        2xl:grid-cols-6 
                        gap-4 
                        mt-4
                ">
                                {albums?.map((album) =>
                                    <div
                                        onClick={() => { user.setActiveAlbum(album); user.setActiveTracksType('album'); router.push('/tracks') }}
                                        key={album.album_id}

                                    >
                                        <AlbumItem data={album} />
                                    </div>

                                )}
                            </div>
                        </div>
                    </div>

                    : (!profilePage && user.activeUser.is_artist === 0) ?
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Playlists
                            </h1>
                            <div className="flex flex-row">
                                {playlists?.map((playlist) =>
                                    <div key={playlist.playlist_id}>

                                        <div className="p-3 border rounded w-fit cursor-pointer mr-2 hover:bg-red-500"
                                            onClick={() => { user.setActivePlaylist(playlist); user.setActiveTracksType('playlist'); router.push('/tracks') }}
                                        >
                                            {playlist.playlist_name}</div>

                                        {/* <PlaylistTracks playlist_id={playlist.playlist_id} /> */}
                                    </div>
                                )}
                            </div>

                        </div>

                        : (!profilePage && user.activeUser.is_artist === 1) ?

                            <div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Singles
                                    </h1>
                                    {(tracks) ?
                                        <div>

                                            <Carousel tracks={tracks} albums={[]} />

                                        </div> : "No tracks avaialable."}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">
                                        Albums
                                    </h1>

                                    <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-3 
                        xl:grid-cols-4 
                        2xl:grid-cols-6 
                        gap-4 
                        mt-4
                ">
                                        {albums?.map((album) =>
                                            <div
                                                onClick={() => { user.setActiveAlbum(album); user.setActiveTracksType('album'); router.push('/tracks') }}
                                                key={album.album_id}

                                            >
                                                <AlbumItem data={album} />
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>

                            : null



            }







        </div>

    )


}

export default UserDetails;