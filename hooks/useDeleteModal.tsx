//zustand library is similar to redux - allows us to manage state of components
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'


interface DeleteModalStore {
    isOpen: boolean;
    id: number;
    id2: number;
    remove: boolean;
    isAdmin: boolean;
    name: string;
    type: 'track' | 'album' | 'playlist' | 'user' | 'track from album' | 'track from playlist' | 'user';
    setId: (id: number) => void;
    setId2: (id: number) => void;
    setIsRemove: (remove: boolean) => void;
    setIsAdmin: (admin: boolean) => void;
    setName: (name: string) => void;
    setType: (type: 'track' | 'album' | 'playlist' | 'track from album' | 'track from playlist' | 'user') => void;
    onOpen: () => void;
    onClose: () => void;

};
// custom Hook to trigger if modal is visible or not
export const useDeleteModal = create<DeleteModalStore>()(
    persist(
        (set) => ({
            id: 0,
            id2: 0,
            isAdmin: false,
            remove: false,
            name: "",
            type: "track",
            isOpen: false,
            setId: (id: number) => set({ id: id }),
            setId2: (id2: number) => set({ id2: id2 }),
            setIsAdmin: (admin: boolean) => set({ isAdmin: admin }),
            setIsRemove: (remove: boolean) => set({ remove: remove }),
            setName: (name: string) => set({ name: name }),
            setType: (type: 'track' | 'album' | 'playlist' | 'track from album' | 'track from playlist' | 'user') => set({ type: type }),
            onOpen: () => set({ isOpen: true }),
            onClose: () => set({ isOpen: false }),
        }),
        {
            name: 'deleteDetails'
        }
    )
)

