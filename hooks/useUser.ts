//hook to store userID using zustand!
import { SuperUser } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    userId?: number;
    artistId?: number;
    listenerId?: number;
    userRole: 'listener' | 'artist' | 'admin' | 'na';
    activeUser: SuperUser;
    setUserId: (id: number) => void;
    setArtistId: (id: number) => void;
    setListenerId: (id: number) => void;
    setActiveUser: (user: SuperUser) => void;

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
                birth_date: new Date(),
                join_date: new Date(),
                email: "",
                race_name: "",
                ethnicity_name: "",
                gender_name: "",
                artist_id: -1,
                listener_id: -1,
                is_artist: -1
            },
            userRole: 'admin',
            setUserId: (id: number) => set({ userId: id }),
            setArtistId: (id: number) => set({ artistId: id }),

            setListenerId: (id: number) => set({ listenerId: id }),
            setActiveUser: (user: SuperUser) => set({ activeUser: user }),

            setUserRole: (role: 'listener' | 'artist' | 'admin' | 'na') => set({ userRole: role }),
        }),
        {
            name: 'userDetails'
        }
    )
)



