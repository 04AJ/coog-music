//hook to store userID using zustand!
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    userId?: number;
    artistId?: number;
    listenerId?: number;
    userRole: 'listener' | 'artist' | 'admin' | 'na';
    setUserId: (id: number) => void;
    setArtistId: (id: number) => void;
    setListenerId: (id: number) => void;

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
            userRole: 'admin',
            setUserId: (id: number) => set({ userId: id }),
            setArtistId: (id: number) => set({ artistId: id }),

            setListenerId: (id: number) => set({ listenerId: id }),

            setUserRole: (role: 'listener' | 'artist' | 'admin' | 'na') => set({ userRole: role }),
        }),
        {
            name: 'userDetails'
        }
    )
)



