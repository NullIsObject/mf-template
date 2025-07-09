import { startApp, destroyApp } from "wujie"
import { Props as MicroProps } from "@mf-template/common/src/types/wujie"

export class WujieMount {
  private name = ""
  private mountEl: HTMLElement | null = null
  private props: MicroProps
  private getSubAppUrl: GetSubAppUrl

  constructor({
    name,
    el,
    props,
    getSubAppUrl,
  }: {
    name: string
    el?: HTMLElement
    props: MicroProps
    getSubAppUrl: GetSubAppUrl
    beforeLoad?: (appWindow: Window) => any
  }) {
    this.name = name
    this.mountEl = el ?? null
    this.props = props
    this.getSubAppUrl = getSubAppUrl
  }

  mount(el: HTMLElement) {
    if (this.mountEl) throw new Error("不要重复挂载节点")
    this.mountEl = el
    return this
  }

  destroy() {
    destroyApp(this.name)
  }

  jump(url: string) {
    if (!this.mountEl) {
      throw new Error("请调用mount()将子应用挂载到某个dom节点上")
    }
    const _this = this
    const props = this.props
    return startApp({
      name: this.name,
      url: url,
      el: this.mountEl,
      props: this.props,
      fetch(input, init) {
        const pageBaseUrl = `${window.location.origin}${props.pageBaseRoute}`
        // 为了同步主应用和子应用的url，子页面的请求路径默认与主应用相同，在这里作拦截，修改成正确的请求
        if (typeof input === "string" && input.startsWith(pageBaseUrl)) {
          const params = input.replace(pageBaseUrl, "")
          input = _this.getSubAppUrl(params)
        }
        return window.fetch(input, init)
      },
      plugins: [
        {
          /**
           * @see {@link https://github.com/Tencent/wujie/issues/434#issuecomment-1614089196}
           */
          patchElementHook(element, iframeWindow: Window) {
            if (element.nodeName === "STYLE") {
              ; (element as any as Element).insertAdjacentElement = function (_position, ele) {
                return iframeWindow.document.head.appendChild(ele)
              }
            }
          },
          jsBeforeLoaders: [
            {
              callback(appWindow) {
                const history = appWindow.history
                const rawPushState = history.pushState
                history.pushState = function (...args) {
                  window.history.pushState(...args)
                  rawPushState.call(history, ...args)
                }
                const rawReplaceState = history.replaceState
                history.replaceState = function (...args) {
                  window.history.replaceState(...args)
                  rawReplaceState.call(history, ...args)
                }
              },
            },
          ],
        },
      ],
    }).then(() => void 0)
  }
}

export type GetSubAppUrl = (route: string) => string
