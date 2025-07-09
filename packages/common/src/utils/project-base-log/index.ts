import { consola } from "consola"

function log() {
  const isMain = !window.__POWERED_BY_WUJIE__
  const log = consola.withDefaults({
    level: 5,
    tag: `${isMain ? "main-app" : "wujie-app"}:project-info`,
  })

  log.info(import.meta.env.VITE_PROJECT_NAME)
  log.info(`version: ${import.meta.env.VITE_PROJECT_VERSION}`)
  log.info(`build-time: ${import.meta.env.VITE_BUILD_TIME}`)
}

log()
