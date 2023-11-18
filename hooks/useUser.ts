//hook to store userID using zustand!
import { Album, Playlist, SuperUser } from '@/types';
import { album } from '@prisma/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    userId?: number;
    artistId?: number;
    listenerId?: number;
    userRole: 'listener' | 'artist' | 'admin' | 'na';
    activeUser: SuperUser;
    activeAlbum: Album;
    activePlaylist: Playlist;
    activeTracksType: 'album' | 'playlist' | 'na';
    setUserId: (id: number | undefined) => void;
    setArtistId: (id: number) => void;
    setListenerId: (id: number) => void;
    setActiveUser: (user: SuperUser) => void;
    setActiveAlbum: (album: Album) => void;
    setActivePlaylist: (playlist: Playlist) => void;
    setActiveTracksType: (type: 'album' | 'playlist' | 'na') => void;
    setUserRole: (role: 'listener' | 'artist' | 'admin' | 'na') => void;


}



// export const useUser = create<User>(

//     (set) => ({
//         userId: undefined,
//         userRole: 'admin',
//         setUserId: (id: number) => set({ userId: id }),
//         setUserRole: (role: 'listener' | 'artist' | 'admin' | 'na') => set({ userRole: role }),
//     })

// )

export const useUser = create<User>()(
    persist(
        (set) => ({
            userId: undefined,
            artistId: undefined,
            listenerId: undefined,
            activeUser: {
                user_id: -1,
                user_name: "",
                password: "",
                birth_date: new Date(),
                join_date: new Date(),
                email: "",
                race_name: "",
                ethnicity_name: "",
                gender_name: "",
                artist_id: -1,
                listener_id: -1,
                is_artist: -1,
                is_admin: -1
            },
            activeAlbum: {
                album_id: -1,
                artist_id: -1,
                album_name: "",
                album_created_at: new Date(),
                album_release_date: new Date(),
                album_cover_path: ""
            },
            activePlaylist: {
                playlist_id: -1,
                listener_id: -1,
                playlist_name: "",
                playlist_created_at: new Date(),
                playlist_updated_at: new Date(),
            },
            activeTracksType: 'na',
            userRole: 'na',
            setUserId: (id: number | undefined) => set({ userId: id }),
            setArtistId: (id: number) => set({ artistId: id }),
            setListenerId: (id: number) => set({ listenerId: id }),
            setActiveUser: (user: SuperUser) => set({ activeUser: user }),
            setActiveAlbum: (album: Album) => set({ activeAlbum: album }),
            setActivePlaylist: (playlist: Playlist) => set({ activePlaylist: playlist }),
            setActiveTracksType: (type: 'album' | 'playlist' | 'na') => set({ activeTracksType: type }),
            setUserRole: (role: 'listener' | 'artist' | 'admin' | 'na') => set({ userRole: role }),
        }),
        {
            name: 'userDetails'
        }
    )
)



