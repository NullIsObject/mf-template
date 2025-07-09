/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_NAME: string
  readonly VITE_MICRO_APP_SERVER: string
  readonly VITE_PROJECT_VERSION: string
  readonly VITE_BUILD_TIME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
