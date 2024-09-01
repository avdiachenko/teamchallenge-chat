import { create } from "zustand";
import { api } from "../../shared/api/api";
import { AuthData } from "./user.types";

type Store = {
  token: string | null;
  refreshToken: string | null;
  name: string | null;
  email: string | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  login: (loginInputs: AuthData) => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<Store>((set) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  loading: false,
  error: false,
  errorMessage: "",

  login: async (loginInputs: AuthData) => {
    try {
      set({ loading: true, error: false });
      const data = await api("/users/login", {
        method: "POST",
        body: JSON.stringify(loginInputs),
      });

      set({
        token: data.token,
        refreshToken: data.refreshToken,
        name: data.user.name,
        email: data.user.email,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await api("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ token: null, refreshToken: null, name: null, email: null });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }
  },
}));
