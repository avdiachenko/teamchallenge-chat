import { create } from "zustand";
import { api } from "../../shared/api/api";
import { AuthData, RegistrationData } from "./user.types";

type Store = {
  token: string | null;
  refreshToken: string | null;
  name: string | null;
  email: string | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  regLoading: boolean;
  regSuccess: boolean;
  regError: boolean;
  regErrorMessage: string;
  registration: (registrationData: RegistrationData, reset: () => void) => Promise<void>;
  login: (loginInputs: AuthData, reset: () => void) => Promise<void>;
  logout: () => Promise<void>;
  clearMessage: () => void;
};

export const useUserStore = create<Store>((set) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  name: localStorage.getItem("name"),
  email: localStorage.getItem("email"),
  loading: false,
  error: false,
  errorMessage: "",
  regLoading: false,
  regSuccess: false,
  regError: false,
  regErrorMessage: "",

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
        email: data.user.email,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
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

  clearMessage: () =>
    set({
      error: false,
      errorMessage: "",
      regError: false,
      regErrorMessage: "",
      regSuccess: false,
    }),
}));
