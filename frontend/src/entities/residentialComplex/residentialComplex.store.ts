/* eslint-disable no-console */
import { create } from "zustand";
import { api } from "../../shared/api/api";
import { Complex } from "./residentialComplex.types";

type Store = {
  complexes: Complex[];
  loading: boolean;
  error: boolean;
  errorMessage: string;
  success: boolean;

  fetchComplexes: () => Promise<void>;
  clearMessage: () => void;
};

export const useResidentialComplexStore = create<Store>((set) => ({
  complexes: [],
  loading: false,
  error: false,
  errorMessage: "",
  success: false,

  fetchComplexes: async () => {
    try {
      set({ loading: true, error: false, errorMessage: "", success: false });
      const data = await api("/api/residential_complex");
      set({ complexes: data });
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  clearMessage: () =>
    set({
      error: false,
      errorMessage: "",
      success: false,
    }),
}));
