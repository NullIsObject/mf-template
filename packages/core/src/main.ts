import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import "./styles/index.css"
import "@mf-template/common/src/utils/project-base-log"

const app = createApp(App)
app.use(router).mount("#app")
