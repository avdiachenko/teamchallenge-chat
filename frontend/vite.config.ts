import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseURL =
    mode === "local-dev"
      ? "http://localhost:4000"
      : "https://team-challenge-backend-c55i.onrender.com";

  return {
    plugins: [react()],
    define: {
      __BASE_URL__: JSON.stringify(baseURL),
    },
  };
});
