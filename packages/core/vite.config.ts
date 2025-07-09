import * as vite from "vite"
import { createEnv } from "./env"
import { createDevServer } from "./devServer.js"
import { env as VitePluginEnv } from "vite-plugin-env"
import AutoImport from "unplugin-auto-import/vite"
import vue from "@vitejs/plugin-vue"
import autoprefixer from "autoprefixer"
import tailwindcss from '@tailwindcss/vite'
import path from "node:path"
import fs from "node:fs"

const envDir = "./"
const packagesSrc = path.resolve(__dirname, "../")
const envConfig = { ...vite.loadEnv("development", envDir), ...createEnv() }
const devServer = createDevServer(envConfig)

const buildInput = {
  main: "./page/index.html",
}
const microServerList = fs.readdirSync("./micro-server-static")
microServerList.forEach(serverName => {
  buildInput[serverName] = `./micro-server-static/${serverName}/index.html`
})

export default vite.defineConfig({
  base: `/${envConfig.VITE_PROJECT_NAME}`,
  envDir: envDir,
  server: devServer,
  preview: devServer,
  build: {
    sourcemap: false,
    cssTarget: "chrome58",
    outDir: `../../dist/${envConfig.VITE_PROJECT_NAME}`,
    emptyOutDir: true,
    rollupOptions: {
      input: buildInput,
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  plugins: [
    VitePluginEnv(envConfig) as vite.PluginOption,
    tailwindcss(),
    AutoImport({
      imports: ["vue"],
      vueTemplate: true,
      dts: path.resolve(packagesSrc, "common/ts-shim", "auto-imports.d.ts"),
    }),
    vue(),
  ]
})