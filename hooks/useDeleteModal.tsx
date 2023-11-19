//zustand library is similar to redux - allows us to manage state of components
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'


interface DeleteModalStore {
    isOpen: boolean;
    id: number;
    isAdmin: boolean;
    name: string;
    type: 'track' | 'album' | 'playlist' | 'user' | 'track from album' | 'track from playlist';
    setId: (id: number) => void;
    setIsAdmin: (admin: boolean) => void;
    setName: (name: string) => void;
    setType: (type: 'track' | 'album' | 'playlist') => void;
    onOpen: () => void;
    onClose: () => void;

};
// custom Hook to trigger if modal is visible or not
export const useDeleteModal = create<DeleteModalStore>()(
    persist(
        (set) => ({
            id: 0,
            isAdmin: false,
            name: "",
            type: "track",
            isOpen: false,
            setId: (id: number) => set({ id: id }),
            setIsAdmin: (admin: boolean) => set({ isAdmin: admin }),
            setName: (name: string) => set({ name: name }),
            setType: (type: 'track' | 'album' | 'playlist') => set({ type: type }),
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
        }),
        {
            name: 'deleteDetails'
        }
    )
)

