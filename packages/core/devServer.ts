import { ServerOptions, ProxyOptions } from "vite"
import fs from "node:fs"

const PORT = 21306
const microServerList = fs.readdirSync("./micro-server-static")

export function createDevServer(envConfig: Record<string, string>): ServerOptions {
  const microServerProxyConfig = microServerList
    .map(serverName => createMicroServerProxyConfig(serverName))
    .reduce((result, target) => {
      return {
        ...result,
        ...target,
      }
    }, {})
  return {
    host: true,
    port: PORT,
    strictPort: true,
    // 允许跨域
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    },
    proxy: {
      // 重定向控制台默认打印的页面路径
      [`^/${envConfig.VITE_PROJECT_NAME}/?$`]: {
        bypass(req, res) {
          const location = `http://${req.headers.host}/${envConfig.VITE_PROJECT_NAME}/page/`
          if (!res) throw new Error(`response is undefined or null: ${res}`)
          res.writeHead(302, "", { location })
          res.end()
        },
      },
      // 主应用
      [`^/${envConfig.VITE_PROJECT_NAME}/page/[\\s|\\S]`]: {
        target: `http://localhost:${PORT}/`,
        rewrite: () => `/${envConfig.VITE_PROJECT_NAME}/page/`,
      },
      // 微前端服务
      ...microServerProxyConfig,
    },
  }

  function createMicroServerProxyConfig(serverName: string): Record<string, ProxyOptions> {
    return {
      [`^/${envConfig.VITE_PROJECT_NAME}/${envConfig.VITE_MICRO_APP_SERVER}/${serverName}/[\\s|\\S]`]: {
        target: `http://localhost:${PORT}/`,
        rewrite: () => `/${envConfig.VITE_PROJECT_NAME}/micro-server-static/${serverName}/`,
      },
    }
  }
}