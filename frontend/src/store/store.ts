import { create } from "zustand";
type Store = {
  isModal: boolean;
  toggleModal: () => void;
};
export const useStore = create<Store>((set) => ({
  isModal: false,
  toggleModal: () => set((state) => ({ isModal: !state.isModal })),
}));
