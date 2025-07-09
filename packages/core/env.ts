import moment from "moment"
import pkgJson from "../../package.json"

const env = {
  VITE_MICRO_APP_SERVER: "micro-server",
}

export function createEnv(): Record<string, string> {
  return {
    ...env,
    VITE_PROJECT_NAME: pkgJson.name ?? "",
    VITE_PROJECT_VERSION: pkgJson.version ?? "",
    VITE_BUILD_TIME: moment().format("YYYY-MM-DD HH:mm:ss"),
  }
}