export const BASE_API_URL =
  import.meta.env.MODE === "local-dev"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_REMOTE_API_URL;
