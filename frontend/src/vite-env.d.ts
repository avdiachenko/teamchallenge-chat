/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_LOCAL_API_URL: string;
  readonly VITE_REMOTE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
