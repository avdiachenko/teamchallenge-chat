import { create } from "zustand";
type Store = {
  isRefetch: boolean;
  isModal: boolean;
  toggleModal: () => void;
  toggleRefetch: () => void;
};
export const useStore = create<Store>((set) => ({
  isRefetch: false,
  isModal: false,
  toggleModal: () => set((state) => ({ isModal: !state.isModal })),
  toggleRefetch: () => set((state) => ({ isRefetch: !state.isRefetch })),
}));
