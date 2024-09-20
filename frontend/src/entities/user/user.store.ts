import { create } from "zustand";
import { api } from "../../shared/api/api";
import { BASE_URL } from "../../shared/constants/urls";
import { AuthData, RegistrationData } from "./user.types";
import { isTokenExpired } from "./user.utils";

type Store = {
  token: string | null;
  refreshToken: string | null;
  name: string | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  regLoading: boolean;
  regSuccess: boolean;
  regError: boolean;
  regErrorMessage: string;
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
  name: null,
  loading: false,
  error: false,
  errorMessage: "",
  regLoading: false,
  regSuccess: false,
  regError: false,
  regErrorMessage: "",
  isInitialized: false,

  isAuth: () => {
    const { token, refreshToken, name } = get();

    return (
      !!token && !isTokenExpired(token) && !!refreshToken && !isTokenExpired(refreshToken) && !!name
    );
  },

  initialization: async () => {
    const { token, refreshToken, refresh, updateUserInfo } = get();
    const isTokenValid = token && !isTokenExpired(token);
    const isRefreshTokenValid = refreshToken && !isTokenExpired(refreshToken);

    if (!isTokenValid) {
      localStorage.removeItem("token");
      set({ token: null });
      if (isRefreshTokenValid) await refresh();
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

      if (data.name) set({ name: data.name });
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
      set({ regLoading: true, regSuccess: false, regError: false });

      await api("/users/register", {
        method: "POST",
        body: JSON.stringify(registrationData),
      });

      set({ regSuccess: true });

      reset();
    } catch (error) {
      console.error(error);
      set({ regError: true, regErrorMessage: (error as Error).message });
    } finally {
      set({ regLoading: false });
    }
  },

  login: async (loginInputs: AuthData, reset: () => void) => {
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
    set({ token: null, refreshToken: null, name: null });

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  clearMessage: () =>
    set({
      error: false,
      errorMessage: "",
      regError: false,
      regErrorMessage: "",
      regSuccess: false,
    }),

  forgotPassword: async (email: string, reset: () => void) => {
    try {
      set({ loading: true, error: false, errorMessage: "" });

      await api("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

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
      set({ loading: true, error: false, errorMessage: "" });

      await api(`/users/update-password/${tempCode}`, {
        method: "POST",
        body: JSON.stringify({ newPassword }),
      });

      reset();
    } catch (error) {
      console.error(error);
      set({ error: true, errorMessage: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));
