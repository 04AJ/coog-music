//zustand library is similar to redux - allows us to manage state of components
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'


interface UpdateModalStore {
    isOpen: boolean;
    isAdmin: boolean;
    id: number;
    name: string;
    type: 'track' | 'album' | 'playlist';
    genre: number | undefined;
    setId: (id: number) => void;
    setIsAdmin: (admin: boolean) => void;
    setName: (name: string) => void;
    setType: (type: 'track' | 'album' | 'playlist') => void;
    setGenre: (genre: number | undefined) => void;
    onOpen: () => void;
    onClose: () => void;

};
// custom Hook to trigger if modal is visible or not
export const useUpdateModal = create<UpdateModalStore>()(
    persist(
        (set) => ({
            id: 0,
            isAdmin: false,
            name: "",
            type: "track",
            genre: 0,
            isOpen: false,
            setId: (id: number) => set({ id: id }),
            setIsAdmin: (admin: boolean) => set({ isAdmin: admin }),
            setName: (name: string) => set({ name: name }),
            setType: (type: 'track' | 'album' | 'playlist') => set({ type: type }),
            setGenre: (genre: number | undefined) => set({ genre: genre }),
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
        }),
        {
            name: 'updateDetails'
        }
    )
)

