//zustand library is similar to redux - allows us to manage state of components
import { create } from "zustand"

interface UpdateProfileModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

};
// custom Hook to trigger if modal is visible or not
const useUpdateProfileModal = create<UpdateProfileModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUpdateProfileModal;