//zustand library is similar to redux - allows us to manage state of components
import { create } from "zustand"

interface UpdateModalStore {
    isOpen: boolean;
    id: number;
    name: string;
    type: 'track' | 'album' | 'playlist';
    genre: number | undefined;
    setId: (id: number) => void;
    setName: (name: string) => void;
    setType: (type: 'track' | 'album' | 'playlist') => void;
    setGenre: (genre: number | undefined) => void;
    onOpen: () => void;
    onClose: () => void;

};
// custom Hook to trigger if modal is visible or not
const useUpdateModal = create<UpdateModalStore>((set) => ({
    id: 0,
    name: "",
    type: "track",
    genre: 0,
    isOpen: false,
    setId: (id: number) => set({ id: id }),
    setName: (name: string) => set({ name: name }),
    setType: (type: 'track' | 'album' | 'playlist') => set({ type: type }),
    setGenre: (genre: number | undefined) => set({ genre: genre }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUpdateModal;