import { create } from 'zustand';

interface PlayerStore {
    ids: number[];
    trackPath?: string;
    activeId?: number;
    setId: (id: number | undefined) => void;
    setPath: (path: string) => void;
    setIds: (ids: number[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    trackPath: undefined,
    activeId: undefined,
    setId: (id: number | undefined) => set({ activeId: id }),
    setPath: (path: string) => set({ trackPath: path }),
    setIds: (ids: number[]) => set({ ids }),
    reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;