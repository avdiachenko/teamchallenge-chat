import { useUserStore } from "../../entities/user/user.store";
import { BASE_URL } from "../constants/urls";

export const api = async (url: string, options: RequestInit = {}) => {
  const { token } = useUserStore.getState();

  const modifiedOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
  };

  try {
    const res = await fetch(BASE_URL + url, modifiedOptions);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Request failed");
    }
    if (res.status === 204) return null;
    if (res.headers.get("content-type")?.includes("application/json")) return await res.json();
    return await res.text();
  } catch (error) {
    return Promise.reject(error);
  }
};
