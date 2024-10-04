/* eslint-disable no-console */
import { create } from "zustand";
import { api } from "../../shared/api/api";
import { BASE_URL } from "../../shared/constants/urls";
import { AuthData, RegistrationData, User } from "./user.types";
import { isTokenExpired } from "./user.utils";

type Store = {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  success: boolean;
  isInitialized: boolean;

  isAuth: () => boolean;
  initialization: () => Promise<void>;
  updateUserInfo: () => Promise<void>;
  refresh: () => Promise<void>;
  registration: (registrationData: RegistrationData, reset: () => void) => Promise<void>;
  login: (loginInputs: AuthData, reset: () => void) => Promise<void>;
  logout: () => Promise<void>;
  clearTokens: () => void;
  clearMessage: () => void;
  forgotPassword: (email: string, reset: () => void) => Promise<void>;
  updatePassword: (tempCode: string, password: string, reset: () => void) => Promise<void>;
};

export const useUserStore = create<Store>((set, get) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  loading: false,
  error: false,
  errorMessage: "",
  success: false,
  isInitialized: false,

  isAuth: () => {
    const { token, user } = get();

    return !!token && !isTokenExpired(token) && !!user;
  },

  initialization: async () => {
    const { token, refreshToken, refresh, updateUserInfo } = get();
    const isTokenValid = token && !isTokenExpired(token);
    const isRefreshTokenValid = refreshToken && !isTokenExpired(refreshToken);

    if (!isTokenValid) {
      localStorage.removeItem("token");
      set({ token: null });
      if (isRefreshTokenValid) {
        console.log(isRefreshTokenValid);
        await refresh();
      }
    }
    if (!isRefreshTokenValid) {
      localStorage.removeItem("refreshToken");
      set({ refreshToken: null });
    }
    if (isTokenValid) await updateUserInfo();

    set({ isInitialized: true });
  },

  updateUserInfo: async () => {
    try {
      const data = await api("/users/user-info");

      if (!data) throw new Error("Failed to fetch user info");

      if (data.name) set({ user: data });
    } catch (error) {
      console.error(error);
    }
  },

  refresh: async () => {
    try {
      const refreshToken = get().refreshToken;

      if (!refreshToken) throw new Error("No refresh token available");

      const res = await fetch(BASE_URL + "/users/refreshCurrent", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to refresh token");

      const { token, refreshToken: newRefreshToken } = await res.json();

      if (!token || !newRefreshToken) throw new Error("Invalid token or refresh token in response");

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", newRefreshToken);

      set({ token, refreshToken: newRefreshToken });
    } catch (error) {
      console.error(error);
    }
  },

  registration: async (registrationData: RegistrationData, reset: () => void) => {
    try {
      set({ loading: true, success: false, error: false, errorMessage: "" });

      await api("/users/register", {
        method: "POST",
        body: JSON.stringify(registrationData),
      });

      set({ success: true });

      reset();
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginInputs: AuthData, reset: () => void) => {
    try {
      set({ loading: true, error: false, errorMessage: "", success: false });

      const data = await api("/users/login", {
        method: "POST",
        body: JSON.stringify(loginInputs),
      });

      console.log(data);

      set({
        token: data.token,
        refreshToken: data.refreshToken,
        user: data.user,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);

      reset();
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
      });
    } catch (error) {
      console.error(error);
    } finally {
      get().clearTokens();
    }
  },

  clearTokens: () => {
    set({ token: null, refreshToken: null, user: null });

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  clearMessage: () =>
    set({
      error: false,
      errorMessage: "",
      success: false,
    }),

  forgotPassword: async (email: string, reset: () => void) => {
    try {
      set({ loading: true, error: false, errorMessage: "", success: false });

      await api("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      set({ success: true });

      reset();
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updatePassword: async (tempCode: string, newPassword: string, reset: () => void) => {
    try {
      set({ loading: true, error: false, errorMessage: "", success: false });

      await api(`/users/update-password/${tempCode}`, {
        method: "POST",
        body: JSON.stringify({ newPassword }),
      });

      set({ success: true });

      reset();
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
