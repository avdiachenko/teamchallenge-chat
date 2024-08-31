import { create } from "zustand";
import { BASE_URL } from "../../shared/constants/urls";
import { AuthData } from "./user.types";

type Store = {
  token: string | null;
  refreshToken: string | null;
  name: string | null;
  email: string | null;
  loading: boolean;
  error: boolean;
  login: (loginInputs: AuthData) => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<Store>((set, get) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  loading: false,
  error: false,

  login: async (loginInputs: AuthData) => {
    try {
      set({ loading: true, error: false });
      const res = await fetch(BASE_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInputs),
      });
      const data = await res.json();
      if (!res.ok) throw new Error("Login failed");
      set({
        token: data.token,
        refreshToken: data.refreshToken,
        name: data.user.name,
        email: data.user.email,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("name", JSON.stringify(data.user.name));
      localStorage.setItem("email", JSON.stringify(data.user.email));
    } catch {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await fetch(BASE_URL + "/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().token}`,
        },
      });

      if (!res.ok) throw new Error("Logout failed");

      set({ token: null, refreshToken: null, name: null, email: null });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    } catch {
      console.log("Logout failed");
    }
  },
}));
